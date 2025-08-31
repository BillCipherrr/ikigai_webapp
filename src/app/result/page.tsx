"use client";

import { IkigaiChart } from "@/components/IkigaiChart";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function ResultPage() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [isShareable, setIsShareable] = useState(false);

  useEffect(() => {
    // Check if running on the client and if the share API is available
    if (typeof window !== "undefined" && "share" in navigator) {
      setIsShareable(true);
    }
  }, []);

  const handleDownloadPNG = () => {
    if (chartRef.current) {
      html2canvas(chartRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.download = "ikigai.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    }
  };

  const handleDownloadPDF = () => {
    if (chartRef.current) {
      html2canvas(chartRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("ikigai.pdf");
      });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: '我的 Ikigai 探索結果',
        text: '我剛剛透過這個很棒的網站探索了我的 Ikigai，你也來試試看吧！',
        url: window.location.href,
      }).catch(console.error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-24">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">
          你的 Ikigai 圖表
        </h1>
        <div ref={chartRef} className="flex justify-center mb-12 bg-white p-4">
          <IkigaiChart />
        </div>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button onClick={handleDownloadPNG} className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600">下載 PNG</button>
          <button onClick={handleDownloadPDF} className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600">下載 PDF</button>
          {isShareable && <button onClick={handleShare} className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600">分享</button>}
        </div>
        <div className="text-center">
          <Link
            href="/journey"
            className="px-6 py-2 text-blue-600 font-semibold rounded-lg hover:bg-gray-100"
          >
            &larr; 返回修改
          </Link>
        </div>
      </div>
    </main>
  );
}