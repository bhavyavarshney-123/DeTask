package handlers

import "net/http"

func CorsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Set CORS headers
		if r.Method == http.MethodOptions {
			// Set CORS headers for preflight request
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization,x-cid")
			w.WriteHeader(http.StatusOK) // Respond with status OK
			return
		}
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		// Call the next handler
		next.ServeHTTP(w, r)
	})
}
