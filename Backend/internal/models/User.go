package models

type User struct {
	Username     string       `json:"username"`
	PasswordHash string       `json:"password"`
	Tasks        *TaskManager `json:"tasks"`
}

func (u *User) InitializeTaskManager() {
	u.Tasks = &TaskManager{
		Tasks:  make(map[int]Task),
		NextID: 1,
	}
}
