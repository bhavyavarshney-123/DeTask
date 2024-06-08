package models

import (
	"errors"
)

type TaskManager struct {
	Tasks  map[int]Task `json:"tasksmap"`
	NextID int          `json:"id"`
}

func NewTaskManager() *TaskManager {
	return &TaskManager{
		Tasks:  make(map[int]Task),
		NextID: 1,
	}
}

func (tm *TaskManager) AddTask(title, description string) (int, error) {

	task := Task{
		ID:          tm.NextID,
		Title:       title,
		Description: description,
		Status:      false,
	}
	tm.Tasks[tm.NextID] = task
	tm.NextID++

	return task.ID, nil
}

func (tm *TaskManager) GetTask(id int) (Task, error) {

	task, exists := tm.Tasks[id]
	if !exists {
		return Task{}, errors.New("task not found")
	}
	return task, nil
}

func (tm *TaskManager) UpdateTask(id int, Task Task) error {

	task, exists := tm.Tasks[id]
	if !exists {
		return errors.New("task not found")
	}
	task.Title = Task.Title
	task.Description = Task.Description
	task.Status = Task.Status
	tm.Tasks[id] = task
	return nil
}

func (tm *TaskManager) DeleteTask(id int) error {

	if _, exists := tm.Tasks[id]; !exists {
		return errors.New("task not found")
	}
	delete(tm.Tasks, id)
	return nil
}
