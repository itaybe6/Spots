# 1. שימוש בתמונה בסיסית של Node.js
FROM node:20

# 2. הגדרת תיקיית העבודה
WORKDIR /usr/src/app

# 3. העתקת קבצי התלויות
COPY package*.json ./
RUN npm install

# 4. העתקת כל הקבצים של השרת
COPY . .

# 5. התקנת local-cors-proxy (lcp)
RUN npm install -g local-cors-proxy

# 6. חשיפת הפורטים של השרת וה-proxy
EXPOSE 5001 8010

# 7. הרצת `lcp` במקביל לשרת
CMD ["sh", "-c", "lcp --proxyUrl https://maps.googleapis.com & node server.js"]
