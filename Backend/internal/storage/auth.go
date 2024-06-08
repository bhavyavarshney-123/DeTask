package storage

import (
	"DeTask/internal/models"
	"DeTask/internal/storage/Badgerdb"
	"fmt"
)

func (s *IPFSStorage) RegisterUser(username, password string) (string, error) {
	user := models.User{
		Username:     username,
		PasswordHash: hashPassword(password),
	}
	user.InitializeTaskManager()

	cid, err := s.CreateUser(&user)
	if err != nil {
		return "", err
	}
	return cid, nil
}

func (s *IPFSStorage) AuthenticateUser(username, password, cid string) (*models.User, bool, error) {
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
		fmt.Println("Authentication Failed,please use the latest CID")
		return nil, false, nil
	} else {
		user, err := s.GetUser(cid)
		if err != nil {
			return nil, false, err
		}

		if user.Username == username && user.PasswordHash == hashPassword(password) {
			return user, true, nil
		}
		return nil, false, nil
	}
}
