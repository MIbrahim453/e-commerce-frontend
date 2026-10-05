import { App, message as staticMessage } from "antd";

/**
 * Reusable Ant Design message hook.
 * Uses App.useApp() context provided by AntdApp in main.jsx,
 * with graceful fallback to static message methods.
 */
export const useMessage = () => {
  try {
    const app = App.useApp();
    if (app && app.message) {
      return app.message;
    }
  } catch (error) {
    // If called outside App context
    console.warn("useMessage: called outside AntdApp context, falling back to static message", error);
  }
  return staticMessage;
};

export default useMessage;
