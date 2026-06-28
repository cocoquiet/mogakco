import * as vscode from "vscode";

export function getWebviewContent(state: number): string {
  switch (state) {
    case 0:
      return "index.html";
    case 1:
      return "channel.html"; // Todo: Implement channel.html content
    default:
      return "index.html";
  }
}
