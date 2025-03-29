package main

import (
	"fmt"
	"log"
	"net"
	"strings"
	"time"
)

func do(conn net.Conn) {
	var buff []byte = make([]byte, 1024)
	n, err := conn.Read(buff)
	if err != nil {
		log.Fatal(err)
	}
	request := string(buff[:n])
	requestLine := strings.Split(request, "\n")[0]
	path := strings.Split(requestLine, " ")[1]
	if path == "/home" {
		time.Sleep(10 * time.Second)
		home(conn)
	} else {
		time.Sleep(5 * time.Second)
		conn.Write([]byte("HTTP/1.1 200 OK \r\n\r\n Hello World\r\n"))
	}
	conn.Close()

}

func main() {
	listner, err := net.Listen("tcp", ":3000")
	if err != nil {
		log.Fatal(err)
	}
	for {
		fmt.Println("Accepting new Connection")
		conn, err := listner.Accept()
		if err != nil {
			log.Fatal(err)
		}
		fmt.Println("Connection accept")
		go do(conn)
	}

}

func home(conn net.Conn) {
	conn.Write([]byte("HTTP/1.1 200 OK \r\n\r\n Request to home\r\n"))
}
