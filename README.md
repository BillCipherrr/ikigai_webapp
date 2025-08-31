# 🌟 Ikigai 互動式探索網站

這是一個引導使用者探索內心、尋找生活意義 (Ikigai) 的互動式網站。透過一個充滿動畫效果的、分步式的旅程，使用者可以深入思考「所愛之事」、「所擅之事」、「世界所需」與「可獲報酬之事」，並最終生成一張個人化的 Ikigai 文氏圖。

## ✨ 主要功能

- **動畫引導流程:** 以優雅的動畫效果，從概念介紹到分步探索，提供流暢的使用者體驗。
- **分步式探索:** 將複雜的思考拆解為四個獨立的步驟，減輕使用者負擔，引導深度反思。
- **動態視覺化圖表:** 根據使用者輸入的內容，即時動態生成一張個人化的 SVG 文氏圖。
- **結果匯出與分享:** 支援將最終的 Ikigai 圖表下載為 PNG 或 PDF，並可透過 Web Share API 分享給朋友。
- **進度本機儲存:** 利用瀏覽器的 Local Storage 自動儲存使用者進度，隨時可以回來繼續探索。
- **響應式設計:** 在桌面和行動裝置上都提供優質的瀏覽體驗。

## 🚀 技術棧

- **框架:** [Next.js](https://nextjs.org/) (App Router)
- **語言:** [TypeScript](https://www.typescriptlang.org/)
- **動畫:** [Framer Motion](https://www.framer.com/motion/)
- **樣式:** [Tailwind CSS](https://tailwindcss.com/)
- **圖表匯出:** [html2canvas](https://html2canvas.hertzen.com/) & [jsPDF](https://github.com/parallax/jsPDF)
- **狀態管理:** React Context

## 🛠️ 本地端運行

1.  **Clone 專案:**
    ```bash
    git clone https://github.com/your-username/ikigai-webapp.git
    cd ikigai-webapp
    ```

2.  **安裝依賴:**
    ```bash
    npm install
    ```

3.  **啟動開發伺服器:**
    ```bash
    npm run dev
    ```

4.  在瀏覽器中打開 `http://localhost:3000` 即可看到網站。

---

這個專案旨在打造一個不僅是工具，更是能陪伴使用者進行自我對話的溫暖空間。
