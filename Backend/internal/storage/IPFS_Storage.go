package storage

import (
	"DeTask/internal/models"
	"bytes"
	"encoding/json"
	shell "github.com/ipfs/go-ipfs-api"
	"io"
	"log"
	"os"
)

type IPFSStorage struct {
	sh *shell.Shell
}

func NewIPFSStorage(sh *shell.Shell) *IPFSStorage {
	return &IPFSStorage{sh: sh}
}

func Init() *shell.Shell {
	ipfsAddress := os.Getenv("IPFS_API_URL")
	if ipfsAddress == "" {
		ipfsAddress = "localhost:5001" // default to localhost if not set
	}
	sh := shell.NewShell(ipfsAddress)
	return sh
}

func (s *IPFSStorage) CreateUser(user *models.User) (string, error) {
	userData, err := json.Marshal(user)
	if err != nil {
		return "", err
	}
	var cid string
	cid, err = s.AddData(userData)
	return cid, err
}

func (s *IPFSStorage) GetUser(cid string) (*models.User, error) {
	data, err := s.GetData(cid)
	if err != nil {
		return nil, err
	}
	var user models.User
	err = json.Unmarshal(data, &user)
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func (s *IPFSStorage) AddData(data []byte) (string, error) {
	cid, err := s.sh.Add(bytes.NewReader(data))
	if err != nil {
		log.Println("Error storing task in IPFS:", err)
		return "", err
	}
	return cid, nil
}

func (s *IPFSStorage) GetData(cid string) ([]byte, error) {
	reader, err := s.sh.Cat(cid)
	if err != nil {
		log.Println("Error retrieving task from IPFS:", err)
		return nil, err
	}

	defer reader.Close()

	data, err := io.ReadAll(reader)
	if err != nil {
		log.Println("Error reading task data from IPFS:", err)
		return nil, err
	}

	return data, nil
}
