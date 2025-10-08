// app/layout.js
import Header from '../components/Header'; 

export const metadata = {
  title: 'SecureFood Digital Twin',
  description: 'Food Supply Chain Monitoring Platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style={{
        margin: 0,
        padding: 0,
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        backgroundColor: '#FAFAF8'
      }}>
        <Header />
        {children}
      </body>
    </html>
  );
}
