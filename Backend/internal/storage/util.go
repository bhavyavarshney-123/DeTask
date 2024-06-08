package storage

import (
	"crypto/sha256"
	"encoding/hex"
)

func hashPassword(password string) string {
	h := sha256.New()
	h.Write([]byte(password))
	return hex.EncodeToString(h.Sum(nil))
}
