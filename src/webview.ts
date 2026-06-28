import * as vscode from "vscode";
import * as fs from "fs";

export function getWebviewContent(
  context: vscode.ExtensionContext,
  webview: vscode.Webview,
  state: number,
): string {
  switch (state) {
    case 0:
      return getHtml(context, webview, "index");
    case 1:
      return getHtml(context, webview, "channel"); // Todo: Implement channel.html content
    default:
      return "";
  }
}

function getHtml(
  context: vscode.ExtensionContext,
  webview: vscode.Webview,
  state: string,
): string {
  const html = fs.readFileSync(
    vscode.Uri.joinPath(context.extensionUri, "media", `${state}.html`).fsPath,
    "utf8",
  );
  const cssUri = webview.asWebviewUri(
    vscode.Uri.joinPath(context.extensionUri, "media", "css", `${state}.css`),
  );
  const jsUri = webview.asWebviewUri(
    vscode.Uri.joinPath(context.extensionUri, "media", "js", `${state}.js`)
  );

  return html
    .replace(`./css/${state}.css`, cssUri.toString())
    .replace(`./js/${state}.js`, jsUri.toString());
}
