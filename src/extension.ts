import * as vscode from "vscode";
import { getWebviewContent } from "./webview";

export function activate(context: vscode.ExtensionContext) {
  const webviewButton = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
  );
  webviewButton.text = "$(organization) mogakco";
  webviewButton.tooltip = "Click to open mogakco webview";
  webviewButton.command = "mogakco.openWebview";
  webviewButton.show();
  context.subscriptions.push(webviewButton);

  const openWebviewCommand = vscode.commands.registerCommand(
    "mogakco.openWebview",
    () => {
      const panel = vscode.window.createWebviewPanel(
        "mogakcoWebview",
        "Mogakco Webview",
        vscode.ViewColumn.Two,
        {
          enableScripts: true,
          retainContextWhenHidden: true,
        },
      );

      panel.webview.html = getWebviewContent(context, panel.webview, 0);
    },
  );
  context.subscriptions.push(openWebviewCommand);
}

export function deactivate() {}
