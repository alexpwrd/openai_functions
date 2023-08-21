'use client';

// Import necessary libraries and hooks
import { useChat } from 'ai/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';  // For GitHub flavoured markdown
import rehypeRaw from 'rehype-raw';  // For handling raw HTML
import rehypeSanitize from 'rehype-sanitize';  // For sanitizing the HTML to prevent XSS attacks
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

/**
 * Chat component to render a conversation between the user and the AI.
 */
export default function Chat() {
    // Use the useChat hook from ai/react to manage the chat state and interactions
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        api: '/api/chat'
    });

    // Define custom rendering for markdown code blocks
    const components = {
        code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
                // Syntax highlight for code blocks
                <SyntaxHighlighter
                    {...props}
                    style={solarizedlight}
                    language={match[1]}
                    PreTag="div"
                >
                    {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
            ) : (
                // Regular inline code without syntax highlighting
                <code className={className} {...props}>
                    {children}
                </code>
            );
        }
    };

    return (
        // Main container for the chat interface
        <div className="chat-container">
            {/* List of messages */}
            <ul style={{ overflowY: 'auto', maxHeight: '75vh' }}>
                {messages.map((m, index) => (
                    <li key={index} className={`prose ${m.role}`}>
                        {/* Display the role (user/AI) of the message sender */}
                        <div className={m.role}>
                            {m.role === 'user' ? 'User: ' : 'AI: '}
                        </div>
                        {/* Render the message content with markdown formatting */}
                        <ReactMarkdown
                            children={m.content}
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw, rehypeSanitize]}
                            components={components}
                        />
                    </li>
                ))}
            </ul>

            {/* Input form for the user to type and send messages */}
            <form onSubmit={handleSubmit}>
                <label>
                    <input value={input} onChange={handleInputChange} placeholder="Type a message..." />
                </label>
                <button type="submit">Send</button>
            </form>
        </div>
    )
}
