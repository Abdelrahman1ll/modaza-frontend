import { Component, type ErrorInfo, type ReactNode } from "react";
import { usePostReportCrashMutation } from "../redux/Email/apiEmail";

interface Props {
  children: ReactNode;
  reportCrash: (data: any) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundaryInner extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo });
    console.error("Uncaught error:", error, errorInfo);

    // Send error report via the passed function
    this.sendErrorEmail(error, errorInfo);
  }

  private sendErrorEmail(error: Error, errorInfo: ErrorInfo) {
    try {
      this.props.reportCrash({
        message: error.toString(),
        stack: errorInfo.componentStack || "No component stack trace available",
        path: window.location.href,
        method: "Front-end UI",
        statusCode: 500,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Failed to report crash:", err);
    }
  }

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-[#fefae0] p-5 text-center">
          <div className="max-w-lg w-full p-10 bg-white border border-[#283618]/10 shadow-[0_10px_30px_rgba(0,0,0,0.05)] rounded-none">
            <h1 className="font-['Cairo'] text-[#283618] text-3xl md:text-4xl mb-2">
              عذراً، حدث خطأ ما
            </h1>
            <p className="text-[#a65d1f] text-lg mb-8 tracking-wider uppercase font-medium">
              Oops! Something went wrong.
            </p>

            <div className="flex justify-center my-8">
              <div className="p-4 rounded-full bg-[#fefae0]/50">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-16 h-16 text-[#283618] opacity-80"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
            </div>

            <p className="text-[#606c38] text-base leading-relaxed mb-10">
              لقد واجهنا مشكلة غير متوقعة. تم إرسال تقرير بالخطأ للمطورين.
              <br />
              <span className="text-sm opacity-80 mt-1 block">
                We've encountered an unexpected issue. An error report has been
                sent to the developers.
              </span>
            </p>

            <button
              onClick={this.handleReload}
              className="bg-[#283618] text-[#fefae0] border-none px-8 py-3 text-sm cursor-pointer transition-all duration-300 hover:bg-[#606c38] hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 uppercase tracking-widest font-bold rounded-none"
            >
              تحديث الصفحة / Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function ErrorBoundary({ children }: { children: ReactNode }) {
  const [reportCrash] = usePostReportCrashMutation();

  const handleReportCrash = (data: any) => {
    reportCrash(data)
      .unwrap()
      .catch((err) => {
        console.error("Redux error reporting failed:", err);
      });
  };

  return (
    <ErrorBoundaryInner reportCrash={handleReportCrash}>
      {children}
    </ErrorBoundaryInner>
  );
}
