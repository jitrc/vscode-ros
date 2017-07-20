import * as extension from "./extension";
import * as vscode from "vscode";

/**
 * Provides catkin build and test tasks.
 */
export default class CatkinTaskProvider implements vscode.TaskProvider {
  public provideTasks(token?: vscode.CancellationToken): vscode.ProviderResult<vscode.Task[]> {
    const command = `catkin build`;

    const build = new vscode.Task({ type: "catkin" }, "build", "catkin");
    build.execution = new vscode.ShellExecution(command, {
      env: extension.env
    });
    build.group = vscode.TaskGroup.Build;
    build.problemMatchers = ["$catkin-gcc"];

    const test = new vscode.Task({ type: "catkin", target: "run_tests" }, "run_tests", "catkin");
    test.execution = new vscode.ShellExecution(`${command} --catkin-make-args run_tests`, {
      env: extension.env
    });
    test.group = vscode.TaskGroup.Test;

    return [build, test];
  }

  public resolveTask(task: vscode.Task, token?: vscode.CancellationToken): vscode.ProviderResult<vscode.Task> {
    return undefined;
  }
}
