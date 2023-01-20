// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as fs from "fs/promises";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log("Activated quick-font-size extension");

  const config = vscode.workspace.getConfiguration("quick-font-size");
  const jumpInterval = config.get("jumpInterval") as number;

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let incrementFontSize = vscode.commands.registerCommand(
    "quick-font-size.increment-font-size",
    async () => {
      const currentFontSize = vscode.workspace
        .getConfiguration("editor")
        .get("fontSize") as number;

      const newFontSize = currentFontSize + jumpInterval;

      await updateFontSize(newFontSize);
    }
  );

  let decrementFontSize = vscode.commands.registerCommand(
    "quick-font-size.decrement-font-size",
    async () => {
      const currentFontSize = vscode.workspace
        .getConfiguration("editor")
        .get("fontSize") as number;

      const newFontSize = currentFontSize - jumpInterval;
      await updateFontSize(newFontSize);
    }
  );

  context.subscriptions.push(incrementFontSize);
  context.subscriptions.push(decrementFontSize);
}

// This method is called when your extension is deactivated
export function deactivate() {}

async function updateFontSize(newSize: number) {
  vscode.workspace
    .getConfiguration("editor")
    .update("fontSize", newSize, vscode.ConfigurationTarget.Global);
}
