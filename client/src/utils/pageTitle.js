const APP_NAME = "Grisfield Schools";

export function setPageTitle(pageName = "") {
  document.title = pageName
    ? `${APP_NAME} - ${pageName}`
    : APP_NAME;
}