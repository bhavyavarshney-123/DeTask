package main

import (
	"DeTask/internal/handlers"
	"DeTask/internal/models"
	"DeTask/internal/storage"
	"github.com/gorilla/mux"
	"log"
	"net/http"
)

func main() {

	// Create IPFS-based storage
	TaskManager := models.NewTaskManager()

	ipfsStorage := storage.NewIPFSStorage(storage.Init())
	userHandler := handlers.NewUserHandler(ipfsStorage, TaskManager)

	// Create a new router instance
	router := mux.NewRouter()

	// User routes
	router.HandleFunc("/register", func(w http.ResponseWriter, r *http.Request) {
		handlers.CorsMiddleware(http.HandlerFunc(userHandler.RegisterUser)).ServeHTTP(w, r)
	}).Methods("POST", "OPTIONS")

	router.HandleFunc("/authenticate", func(w http.ResponseWriter, r *http.Request) {

		handlers.CorsMiddleware(http.HandlerFunc(userHandler.AuthenticateUser)).ServeHTTP(w, r)

	}).Methods("POST", "OPTIONS")

	// Define routes
	router.HandleFunc("/tasks",func(w http.ResponseWriter, r *http.Request) {

		handlers.CorsMiddleware(http.HandlerFunc(userHandler.CreateTask)).ServeHTTP(w, r)

	} ).Methods("POST","OPTIONS")
	//router.HandleFunc("/tasks/{id}", userHandler.GetTask).Methods("GET")
	router.HandleFunc("/tasks/{id}", func(w http.ResponseWriter, r *http.Request) {

		handlers.CorsMiddleware(http.HandlerFunc(userHandler.UpdateTask)).ServeHTTP(w, r)

	}).Methods("PUT","OPTIONS")
	router.HandleFunc("/tasks/{id}", func(w http.ResponseWriter, r *http.Request) {

		handlers.CorsMiddleware(http.HandlerFunc(userHandler.DeleteTask)).ServeHTTP(w, r)

	} ).Methods("DELETE","OPTIONS")

	// Start the server
	log.Println("Server started on :1001")
	log.Fatal(http.ListenAndServe(":1001", router))

}
