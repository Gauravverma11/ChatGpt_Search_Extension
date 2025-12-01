# Chat Search Extension 

A Chrome extension that allows you to search inside ChatGPT chats just like WhatsApp or Instagram chats.  
It highlights matching words and lets you jump between matches using **Next/Prev** buttons.

---

## ⭐ Features

- 🔍 Floating Search Bar inside ChatGPT page  
- ✨ Highlight all matching words  
- ⬆⬇ Navigate between matches (Next/Previous)  
- 🎯 Auto-scroll to each matched message  
- ⚡ Works instantly — no backend required  
- 🪶 Lightweight and fast  
- 🎨 Custom beautiful UI with animations  

---

## 📁 Folder Structure

chat-search-extension/
│
├── manifest.json
├── content_script.js
├── style.css
├── icons/
│ └── icon.png
└── README.md



---

## 🚀 Installation (Load in Chrome)

1. Open Chrome  
2. Go to: **chrome://extensions/**
3. Turn on **Developer Mode** (top-right)
4. Click **Load Unpacked**
5. Select the folder: `chat-search-extension/`
6. Open: https://chat.openai.com  
7. The floating search bar will appear automatically ✔

---

## 🛠 How It Works

- The extension injects a search bar inside the ChatGPT page using **content_script.js**  
- When you type a word:
  - It scans all chat messages  
  - Highlights all matches  
  - Stores matched message nodes  
- When you press:
  - **Next** → scrolls to next match  
  - **Prev** → scrolls to previous match  
- CSS in `style.css` controls the UI styling  

---

## 🔧 Files Explained

### **manifest.json**
Defines:
- permissions
- scripts injected
- target website (ChatGPT)
- extension icons

### **content_script.js**
Contains the whole search system:
- Inject search bar
- Detect text
- Highlight words
- Navigate between matches
- Scroll animations

### **style.css**
Beautiful UI:
- Search bar styling  
- Buttons  
- Input box  
- Highlight animation  

---

## 🎨 Icon

You can place any PNG icon inside `/icons/icon.png` (recommended: 48x48).

---

## 📌 Compatibility

- Chrome (fully supported)
- Edge (works with same steps)
- Brave (works)
- Opera (works)

---

## 📃 License
Free to use, modify, and upload as your own extension.

---

## ✨ Author
Made with ❤️ using VS Code.


