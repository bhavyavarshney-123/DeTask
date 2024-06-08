package Badgerdb

import (
	"encoding/json"
	"fmt"
	"log"
)

func (b *BadgerDB) OldCidList(cid string) {
	CID, err := json.Marshal(cid)
	if err != nil {
		fmt.Println(err)
	}

	err = b.Set(CID, CID)
	if err != nil {
		log.Fatal(err)
	}
}

func (b *BadgerDB) GetOldCidList(cid string) (bool, error) {

	CID, err := json.Marshal(cid)

	if err != nil {
		return false, err
	}

	value, err := b.Get(CID)
	if err != nil {
		fmt.Println("err : ", err)
		return false, err
	}
	var OldCid string
	err = json.Unmarshal(value, &OldCid)
	if err != nil {
		return false, err
	}

	return true, nil
}
