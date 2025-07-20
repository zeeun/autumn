"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// 자주 묻는 질문 (더 컴팩트하게)
const quickQuestions = [
  { icon: "🛏️", text: "침구추가", query: "침구 추가 가능한가요?" },
  { icon: "🚗", text: "주차", query: "주차는 어떻게 하나요?" },
  { icon: "⭐", text: "리뷰이벤트", query: "리뷰 이벤트는 뭔가요?" },
  {
    icon: "🕐",
    text: "시간연장",
    query: "얼리체크인이나 레이트체크아웃 가능한가요?",
  },
  { icon: "📱", text: "넷플릭스", query: "넷플릭스 사용법 알려주세요" },
  { icon: "🚭", text: "흡연", query: "흡연 가능한가요?" },
];

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "안녕하세요! 어텀인남산 파티룸 AI 어시스턴트입니다 🍂\n\n예약, 시설, 요금 등 궁금한 것이 있으시면 편하게 물어보세요!\n아래 버튼을 클릭하시거나 직접 메시지를 입력해주세요 😊",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (message: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.message,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "죄송합니다. 연결에 문제가 생겼어요. 다시 시도해주세요.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() && !isLoading) {
      sendMessage(inputMessage);
    }
  };

  // 스타일 객체들
  const containerStyle = {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
    fontFamily:
      "'Inter', 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
    padding: "8px", // 모바일에서 패딩 줄이기
  };

  const chatContainerStyle = {
    maxWidth: "100%", // 모바일에서 전체 너비 사용
    margin: "0 auto",
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(20px)",
    borderRadius: "16px", // 모바일에서 더 작은 반경
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    overflow: "hidden",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    height: "calc(100vh - 16px)", // 모바일 최적화
    display: "flex",
    flexDirection: "column" as const,
  };

  const headerStyle = {
    background: "linear-gradient(90deg, #f59e0b 0%, #dc2626 100%)",
    padding: "16px", // 모바일에서 패딩 줄이기
    color: "white",
    textAlign: "center" as const,
  };

  const messagesContainerStyle = {
    flex: 1,
    overflowY: "auto" as const,
    padding: "12px", // 모바일에서 패딩 줄이기
    background:
      "linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(249, 250, 251, 0.9))",
  };

  const quickQuestionsContainerStyle = {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "6px", // 더 작은 간격
    marginBottom: "16px",
    justifyContent: "center",
  };

  const quickButtonStyle = {
    padding: "6px 10px", // 더 작은 패딩
    background: "rgba(245, 158, 11, 0.1)",
    border: "1px solid rgba(245, 158, 11, 0.3)",
    borderRadius: "20px", // 더 둥글게
    fontSize: "11px", // 더 작은 폰트
    fontWeight: "500" as const,
    color: "#92400e",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: "4px",
    whiteSpace: "nowrap" as const,
  };

  const messageStyle = (isUser: boolean) => ({
    margin: "8px 0", // 메시지 간격 줄이기
    display: "flex",
    flexDirection: isUser ? ("row-reverse" as const) : ("row" as const),
    alignItems: "flex-start",
    gap: "8px",
  });

  const messageBubbleStyle = (isUser: boolean) => ({
    maxWidth: "85%", // 모바일에서 더 넓게
    padding: "12px 16px", // 패딩 줄이기
    borderRadius: "18px",
    fontSize: "14px", // 폰트 크기 줄이기
    lineHeight: "1.5",
    whiteSpace: "pre-wrap" as const,
    wordWrap: "break-word" as const,
    background: isUser
      ? "linear-gradient(90deg, #f59e0b 0%, #dc2626 100%)"
      : "rgba(255, 255, 255, 0.9)",
    color: isUser ? "white" : "#1f2937",
    border: isUser ? "none" : "1px solid rgba(229, 231, 235, 0.5)",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  });

  const inputContainerStyle = {
    padding: "16px", // 패딩 줄이기
    background: "rgba(255, 255, 255, 0.95)",
    borderTop: "1px solid rgba(229, 231, 235, 0.3)",
  };

  const formStyle = {
    display: "flex",
    gap: "8px", // 간격 줄이기
    alignItems: "flex-end",
  };

  const inputStyle = {
    flex: 1,
    padding: "12px 16px", // 패딩 줄이기
    borderRadius: "20px", // 더 둥글게
    border: "2px solid #e5e7eb",
    fontSize: "14px", // 폰트 크기 줄이기
    outline: "none",
    background: "rgba(255, 255, 255, 0.9)",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
    resize: "none" as const,
    minHeight: "20px",
    maxHeight: "80px", // 최대 높이 줄이기
    overflowY: "auto" as const,
  };

  const sendButtonStyle = {
    padding: "12px 20px", // 패딩 줄이기
    background: "linear-gradient(90deg, #f59e0b 0%, #dc2626 100%)",
    color: "white",
    borderRadius: "20px",
    border: "none",
    cursor: isLoading || !inputMessage.trim() ? "not-allowed" : "pointer",
    opacity: isLoading || !inputMessage.trim() ? 0.5 : 1,
    transition: "all 0.3s ease",
    fontWeight: "600" as const,
    boxShadow: "0 6px 12px -2px rgba(0, 0, 0, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={containerStyle}>
      <div style={chatContainerStyle}>
        {/* 헤더 */}
        <div style={headerStyle}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                width: "32px", // 크기 줄이기
                height: "32px",
                background: "rgba(255, 255, 255, 0.2)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px", // 이모지 크기 줄이기
              }}
            >
              💬
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: "18px", fontWeight: "700" }}>
                {" "}
                {/* 폰트 크기 줄이기 */}
                어텀인남산 파티룸
              </h1>
              <p
                style={{
                  margin: 0,
                  fontSize: "12px",
                  opacity: 0.9,
                  fontWeight: "400",
                }}
              >
                {" "}
                {/* 폰트 크기 줄이기 */}
                AI 고객서비스 어시스턴트
              </p>
            </div>
          </div>
        </div>

        {/* 메시지 영역 */}
        <div style={messagesContainerStyle}>
          {/* 자주 묻는 질문 - 첫 번째 메시지 위에만 표시 */}
          {messages.length === 1 && (
            <div style={quickQuestionsContainerStyle}>
              {quickQuestions.map((item, index) => (
                <button
                  key={index}
                  style={quickButtonStyle}
                  onClick={() => sendMessage(item.query)}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background =
                      "rgba(245, 158, 11, 0.2)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 8px rgba(0, 0, 0, 0.1)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background =
                      "rgba(245, 158, 11, 0.1)";
                    e.currentTarget.style.transform = "translateY(0px)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </button>
              ))}
            </div>
          )}

          {/* 메시지 목록 */}
          {messages.map((message) => (
            <div key={message.id} style={messageStyle(message.isUser)}>
              <div style={messageBubbleStyle(message.isUser)}>
                {message.text}
                <div
                  style={{
                    fontSize: "10px", // 시간 폰트 더 작게
                    opacity: 0.7,
                    marginTop: "4px",
                    textAlign: message.isUser ? "right" : ("left" as const),
                  }}
                >
                  {message.timestamp.toLocaleTimeString("ko-KR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          ))}

          {/* 로딩 표시 */}
          {isLoading && (
            <div style={messageStyle(false)}>
              <div
                style={{
                  ...messageBubbleStyle(false),
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    width: "16px", // 크기 줄이기
                    height: "16px",
                    border: "2px solid #f3f4f6",
                    borderTop: "2px solid #f59e0b",
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite",
                  }}
                />
                입력 중...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* 입력 영역 */}
        <div style={inputContainerStyle}>
          <form onSubmit={handleSubmit} style={formStyle}>
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="궁금한 것을 물어보세요..."
              style={inputStyle}
              disabled={isLoading}
              rows={1}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                target.style.height = Math.min(target.scrollHeight, 80) + "px";
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#f59e0b";
                e.target.style.boxShadow = "0 0 0 4px rgba(245, 158, 11, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
              }}
            />
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              style={sendButtonStyle}
              onMouseOver={(e) => {
                if (!isLoading && inputMessage.trim()) {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 16px -4px rgba(0, 0, 0, 0.2)";
                }
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 6px 12px -2px rgba(0, 0, 0, 0.1)";
              }}
            >
              <Send size={16} /> {/* 아이콘 크기 줄이기 */}
            </button>
          </form>
          <p
            style={{
              fontSize: "11px", // 폰트 크기 줄이기
              color: "#6b7280",
              margin: "12px 0 0 0", // 마진 줄이기
              textAlign: "center" as const,
              fontWeight: "500" as const,
            }}
          >
            어텀인남산 파티룸에 대한 궁금한 점을 언제든 물어보세요! 🍂✨
          </p>
        </div>

        <style jsx>{`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    </div>
  );
}
