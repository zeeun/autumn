"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  MessageCircle,
  Calendar,
  Clock,
  Bed,
  Car,
  Star,
  Sparkles,
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const quickActions = [
  {
    icon: Calendar,
    label: "예약 문의",
    query: "어텀인남산 파티룸 예약하려고 하는데 어떻게 해야 하나요?",
  },
  {
    icon: Clock,
    label: "체크인/아웃",
    query: "체크인 체크아웃 시간이 어떻게 되나요? 얼리 체크인 가능한가요?",
  },
  {
    icon: Bed,
    label: "침구 추가",
    query: "침구 추가로 빌릴 수 있나요? 요금은 얼마인가요?",
  },
  {
    icon: Car,
    label: "주차 문의",
    query: "주차장이 있나요? 주차는 어디에 해야 하나요?",
  },
  {
    icon: Star,
    label: "리뷰 이벤트",
    query: "리뷰 이벤트는 어떻게 진행되나요? 페이백은 얼마인가요?",
  },
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

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText.trim(),
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
        body: JSON.stringify({ message: messageText }),
      });

      const data = await response.json();

      if (response.ok) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.message,
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        throw new Error(data.error || "응답을 받을 수 없습니다.");
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "죄송해요, 현재 응답을 드리기 어려운 상황입니다. 잠시 후 다시 시도해주세요! 😅",
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
    sendMessage(inputMessage);
  };

  const handleQuickAction = (query: string) => {
    sendMessage(query);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background:
          "linear-gradient(135deg, #fef3c7 0%, #fde68a 25%, #f59e0b 75%, #dc2626 100%)",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          background:
            "linear-gradient(90deg, #f59e0b 0%, #ea580c 50%, #dc2626 100%)",
          color: "white",
          padding: "24px",
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              background: "rgba(255, 255, 255, 0.25)",
              padding: "12px",
              borderRadius: "16px",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <MessageCircle size={28} />
          </div>
          <div>
            <h1
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                margin: 0,
                letterSpacing: "-0.025em",
              }}
            >
              🍂 어텀인남산 파티룸
            </h1>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: "14px",
                margin: "4px 0 0 0",
                fontWeight: "500",
              }}
            >
              AI 고객서비스 어시스턴트
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div
        style={{
          padding: "24px",
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(249, 115, 22, 0.1)",
        }}
      >
        <p
          style={{
            color: "#374151",
            fontSize: "14px",
            fontWeight: "600",
            margin: "0 0 16px 0",
          }}
        >
          💡 자주 묻는 질문을 선택해보세요
        </p>
        <div
          style={{
            display: "flex",
            gap: "12px",
            overflowX: "auto",
            paddingBottom: "8px",
          }}
        >
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleQuickAction(action.query)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px 16px",
                background: "linear-gradient(90deg, #fed7aa 0%, #fecaca 100%)",
                color: "#c2410c",
                borderRadius: "16px",
                fontSize: "14px",
                fontWeight: "600",
                whiteSpace: "nowrap",
                border: "1px solid rgba(249, 115, 22, 0.2)",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
              }}
            >
              <action.icon size={16} />
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              display: "flex",
              justifyContent: message.isUser ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                maxWidth: "85%",
                padding: "20px",
                borderRadius: "24px",
                ...(message.isUser
                  ? {
                      background:
                        "linear-gradient(90deg, #f59e0b 0%, #dc2626 100%)",
                      color: "white",
                      borderBottomRightRadius: "8px",
                      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    }
                  : {
                      background: "white",
                      color: "#374151",
                      borderBottomLeftRadius: "8px",
                      boxShadow:
                        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      border: "1px solid #e5e7eb",
                    }),
                backdropFilter: "blur(10px)",
              }}
            >
              <p
                style={{
                  whiteSpace: "pre-wrap",
                  lineHeight: "1.6",
                  fontSize: "14px",
                  fontWeight: "500",
                  margin: 0,
                }}
              >
                {message.text}
              </p>
              <p
                style={{
                  fontSize: "12px",
                  margin: "12px 0 0 0",
                  fontWeight: "500",
                  color: message.isUser
                    ? "rgba(255, 255, 255, 0.7)"
                    : "#9ca3af",
                }}
              >
                {message.timestamp.toLocaleTimeString("ko-KR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div
              style={{
                background: "white",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                borderRadius: "24px",
                borderBottomLeftRadius: "8px",
                border: "1px solid #e5e7eb",
                padding: "20px",
                maxWidth: "85%",
                backdropFilter: "blur(10px)",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <Sparkles
                  size={20}
                  color="#f59e0b"
                  style={{
                    animation: "spin 1s linear infinite",
                  }}
                />
                <span
                  style={{
                    color: "#6b7280",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  답변을 준비하고 있어요...
                </span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          padding: "24px",
          boxShadow: "0 -20px 25px -5px rgba(0, 0, 0, 0.1)",
          borderTop: "1px solid rgba(249, 115, 22, 0.1)",
        }}
      >
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "16px" }}>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="궁금한 것을 물어보세요..."
            disabled={isLoading}
            maxLength={500}
            style={{
              flex: 1,
              padding: "16px 20px",
              border: "2px solid #e5e7eb",
              borderRadius: "24px",
              outline: "none",
              color: "#374151",
              fontSize: "14px",
              fontWeight: "500",
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
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
            style={{
              padding: "16px 24px",
              background: "linear-gradient(90deg, #f59e0b 0%, #dc2626 100%)",
              color: "white",
              borderRadius: "24px",
              border: "none",
              cursor:
                isLoading || !inputMessage.trim() ? "not-allowed" : "pointer",
              opacity: isLoading || !inputMessage.trim() ? 0.5 : 1,
              transition: "all 0.3s ease",
              fontWeight: "600",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            }}
            onMouseOver={(e) => {
              if (!isLoading && inputMessage.trim()) {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1)";
              }
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 10px 15px -3px rgba(0, 0, 0, 0.1)";
            }}
          >
            <Send size={20} />
          </button>
        </form>
        <p
          style={{
            fontSize: "12px",
            color: "#6b7280",
            margin: "16px 0 0 0",
            textAlign: "center",
            fontWeight: "500",
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
  );
}
