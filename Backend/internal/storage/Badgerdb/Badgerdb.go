package Badgerdb

import (
	"github.com/dgraph-io/badger"
	"log"
	"os"
	"path/filepath"
)

type BadgerDB struct {
	db *badger.DB
}

const path = "./temp"

// Open initializes and opens the BadgerDB instance.
func Open() (*BadgerDB, error) {

	// Ensure the directory exists
	if err := os.MkdirAll(filepath.Dir(path), os.ModePerm); err != nil {
		return nil, err
	}
	opts := badger.DefaultOptions(path)
	opts.Truncate = true
	db, err := badger.Open(opts)
	if err != nil {
		return nil, err
	}
	return &BadgerDB{db: db}, nil
}

// Close closes the BadgerDB instance.
func (b *BadgerDB) Close() error {
	return b.db.Close()
}

// Set stores a key-value pair in the BadgerDB.
func (b *BadgerDB) Set(key, value []byte) error {
	err := b.db.Update(func(txn *badger.Txn) error {
		return txn.Set(key, value)
	})
	if err != nil {
		log.Fatalf("Failed to store in the database: %v", err)
	}

	return err
}

// Get retrieves the value for a given key from the BadgerDB.
func (b *BadgerDB) Get(key []byte) ([]byte, error) {
	var value []byte
	err := b.db.View(func(txn *badger.Txn) error {
		item, err := txn.Get(key)
		if err != nil {
			return err
		}
		return item.Value(func(val []byte) error {
			value = append([]byte{}, val...) // Copy the value to avoid issues with mutable slices
			return nil
		})
	})
	if err != nil {
		return nil, err
	}
	return value, nil
}
