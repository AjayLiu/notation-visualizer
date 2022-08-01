export const REPO_LINK = "https://github.com/AjayLiu/notation-visualizer";
export const WEBSITE_LINK = "https://notation-visualizer.ajayliu.com";

export const operators = new Set(["+", "-", "*", "/", "^"]);

export function wait(milliseconds: number) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
