package handlers

import (
	"DeTask/internal/models"
	"DeTask/internal/storage"
	"DeTask/internal/storage/Badgerdb"
	"encoding/json"
	"errors"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

type UserHandler struct {
	storage     *storage.IPFSStorage
	TaskManager *models.TaskManager
}

func NewUserHandler(ipfsStorage *storage.IPFSStorage, TaskManager *models.TaskManager) *UserHandler {
	return &UserHandler{storage: ipfsStorage, TaskManager: TaskManager}
}

func (h *UserHandler) RegisterUser(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	cid, err := h.storage.RegisterUser(req.Username, req.Password)
	if err != nil {
		http.Error(w, "Failed to register user", http.StatusInternalServerError)
		return
	}

	response := map[string]string{"cid": cid}
	json.NewEncoder(w).Encode(response)
}

func (h *UserHandler) AuthenticateUser(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Username string `json:"username"`
		Password string `json:"password"`
		CID      string `json:"cid"`
	}

	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	user, authenticated, err := h.storage.AuthenticateUser(req.Username, req.Password, req.CID)
	if err != nil {
		http.Error(w, "Failed to authenticate user", http.StatusInternalServerError)
		return
	}

	response := map[string]interface{}{"authenticated": authenticated, "user": user}
	json.NewEncoder(w).Encode(response)
}

// Middleware to get user by some identifier, e.g., CID
func (h *UserHandler) getUser(r *http.Request) (string, *models.User, error) {
	// Extract CID or other identifier from request context or headers
	cid := r.Header.Get("X-CID")
	fmt.Println(cid)
	user, err := h.storage.GetUser(cid)
	if err != nil {
		return " ", nil, errors.New("user not found")
	}
	return cid, user, nil
}

func (h *UserHandler) CreateTask(w http.ResponseWriter, r *http.Request) {

	cid, user, err := h.getUser(r)
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	db, err := Badgerdb.Open()
	if err != nil {
		fmt.Println("failed to open the BadgerDb: ", err)
	}
	defer db.Close()
	check, err := db.GetOldCidList(cid)
	if err != nil {
		fmt.Println("failed to get data from db")
	}

	if check == true {
		response := map[string]string{"unauthorised": "cid expired"}
		w.WriteHeader(http.StatusCreated)
		if err := json.NewEncoder(w).Encode(response); err != nil {
			http.Error(w, "Failed to encode response", http.StatusInternalServerError)
		}

		return
	}

	var task models.Task
	err = json.NewDecoder(r.Body).Decode(&task)
	if err != nil {
		fmt.Println("Failed to Get the CID from DB")
	}

	id, err := user.Tasks.AddTask(task.Title, task.Description)
	if err != nil {
		http.Error(w, "Failed to add task", http.StatusInternalServerError)
		return
	}

	newcid, err := h.storage.CreateUser(user)
	if err != nil {
		fmt.Println("Task can't be to the IPFS")
	}
	fmt.Println("new CID after task addition:", newcid)
	db.OldCidList(cid)
	response := map[string]string{"id": strconv.Itoa(id), "cid": newcid}
	w.WriteHeader(http.StatusCreated)
	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
	}
}

func (h *UserHandler) UpdateTask(w http.ResponseWriter, r *http.Request) {

	cid, user, err := h.getUser(r)
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	db, err := Badgerdb.Open()
	if err != nil {
		fmt.Println("failed to open the BadgerDb: ", err)
	}

	defer db.Close()
	check, err := db.GetOldCidList(cid)
	if err != nil {
		fmt.Println("failed to get data from db")
	}

	if check == true {
		response := map[string]string{"unauthorised": "cid expired"}
		w.WriteHeader(http.StatusCreated)
		if err := json.NewEncoder(w).Encode(response); err != nil {
			http.Error(w, "Failed to encode response", http.StatusInternalServerError)
		}

		return
	}

	var task models.Task

	err = json.NewDecoder(r.Body).Decode(&task)
	if err != nil {

		http.Error(w, "Failed to decode request body", http.StatusBadRequest)
		return
	}

	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {

		http.Error(w, "Invalid task ID: "+err.Error(), http.StatusBadRequest)
		return
	}

	err = user.Tasks.UpdateTask(id, task)
	if err != nil {

		http.Error(w, "Failed to update task: "+err.Error(), http.StatusNotFound)
		return
	}

	newcid, err := h.storage.CreateUser(user)
	if err != nil {
		fmt.Println("Task can't be to the IPFS")
	}
	fmt.Println("new CID after task Update:", newcid)

	response := map[string]string{"message": "Task updated successfully", "cid": newcid}
	if err := json.NewEncoder(w).Encode(response); err != nil {

		http.Error(w, "Failed to encode response: "+err.Error(), http.StatusInternalServerError)
	}

}

func (h *UserHandler) DeleteTask(w http.ResponseWriter, r *http.Request) {

	cid, user, err := h.getUser(r)
	if err != nil {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}
	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		http.Error(w, "Invalid task ID: "+err.Error(), http.StatusBadRequest)
		return
	}

	db, err := Badgerdb.Open()
	if err != nil {
		fmt.Println("failed to open the BadgerDb: ", err)
	}

	defer db.Close()
	check, err := db.GetOldCidList(cid)
	if err != nil {
		fmt.Println("failed to get data from db")
	}

	if check == true {
		response := map[string]string{"unauthorised": "cid expired"}
		w.WriteHeader(http.StatusCreated)
		if err := json.NewEncoder(w).Encode(response); err != nil {
			http.Error(w, "Failed to encode response", http.StatusInternalServerError)
		}

		return
	}

	err = user.Tasks.DeleteTask(id)
	if err != nil {
		http.Error(w, "Failed to delete task: "+err.Error(), http.StatusNotFound)
		return
	}
	newcid, err := h.storage.CreateUser(user)
	if err != nil {
		fmt.Println("Task can't be to the IPFS")
	}
	fmt.Println("new CID after task deletion:", newcid)

	response := map[string]string{"message": "Task deleted successfully", "cid": newcid}
	if err := json.NewEncoder(w).Encode(response); err != nil {
		http.Error(w, "Failed to encode response: "+err.Error(), http.StatusInternalServerError)
	}
}
