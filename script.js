"use strict";

const THEME_STORAGE_KEY = "devtrack-theme";
const PROJECT_STORAGE_KEY = "devtrack-v1-projects";
const TASK_STORAGE_KEY = "devtrack-v1-tasks";
const PROJECT_STATUSES = ["Planning", "Active", "On Hold", "Completed"];
const TASK_STATUSES = ["Pending", "In Progress", "Completed"];
const TASK_PRIORITIES = ["Low", "Medium", "High", "Urgent"];

const viewLinks = document.querySelectorAll("[data-view-link]");
const views = document.querySelectorAll("[data-view]");
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeLabel = document.querySelector("[data-theme-label]");
const projectDialog = document.getElementById("project-dialog");
const projectForm = document.getElementById("project-form");
const projectList = document.querySelector("[data-project-list]");
const projectFormError = document.getElementById("project-form-error");
const projectNameInput = document.getElementById("project-name");
const projectDescriptionInput = document.getElementById("project-description");
const projectStatusInput = document.getElementById("project-status");
const taskDialog = document.getElementById("task-dialog");
const taskForm = document.getElementById("task-form");
const taskList = document.querySelector("[data-task-list]");
const taskFormError = document.getElementById("task-form-error");
const taskTitleInput = document.getElementById("task-title");
const taskDescriptionInput = document.getElementById("task-description");
const taskProjectInput = document.getElementById("task-project");
const taskStatusInput = document.getElementById("task-status");
const taskPriorityInput = document.getElementById("task-priority");
const taskDueDateInput = document.getElementById("task-due-date");
const taskSearchInput = document.querySelector("[data-task-search]");
const projectFilter = document.querySelector("[data-project-filter]");
const statusFilter = document.querySelector('[aria-label="Filter by status"]');
const priorityFilter = document.querySelector("[data-priority-filter]");
const dashboardProjectFilter = document.querySelector("[data-dashboard-project-filter]");
const dashboardProjectOverview = document.querySelector("[data-dashboard-project-overview]");
const dashboardRecentTasks = document.querySelector("[data-dashboard-recent-tasks]");
const dashboardProgress = document.querySelector("[data-dashboard-progress]");
const dashboardCompletion = document.querySelector("[data-dashboard-completion]");
const dashboardProgressText = document.querySelector("[data-dashboard-progress-text]");
const totalProjectsCount = document.getElementById("total-projects-count");
const totalProjectsNote = document.getElementById("total-projects-note");
const deleteProjectDialog = document.getElementById("delete-project-dialog");
const deleteProjectMessage = document.getElementById("delete-project-message");
const deleteTaskDialog = document.getElementById("delete-task-dialog");
const deleteTaskMessage = document.getElementById("delete-task-message");
const sampleDataDialog = document.getElementById("sample-data-dialog");
const sampleDataMessage = document.getElementById("sample-data-message");
const confirmSampleButton = document.querySelector("[data-confirm-sample]");

let projectStorageProblem = false;
let malformedProjectStorage = false;
let taskStorageProblem = false;
let malformedTaskStorage = false;
let projects = loadCollection(PROJECT_STORAGE_KEY, isValidStoredProject, "project");
let tasks = loadCollection(TASK_STORAGE_KEY, isValidStoredTask, "task");
let editedProjectId = null;
let editedTaskId = null;
let projectPendingDeletion = null;
let taskPendingDeletion = null;

function getSystemTheme() { return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"; }

function updateThemeControl(theme) {
  const isDarkTheme = theme === "dark";
  themeToggle.setAttribute("aria-pressed", String(isDarkTheme));
  themeToggle.setAttribute("aria-label", `Switch to ${isDarkTheme ? "light" : "dark"} theme`);
  themeLabel.textContent = isDarkTheme ? "Light mode" : "Dark mode";
  themeToggle.querySelector(".theme-toggle-icon").textContent = isDarkTheme ? "☀" : "☾";
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]').setAttribute("content", theme === "dark" ? "#071521" : "#087EA4");
  updateThemeControl(theme);
}

function showView(viewName) {
  const requestedView = document.querySelector(`[data-view="${viewName}"]`);
  if (!requestedView) return;
  views.forEach((view) => {
    const isCurrentView = view === requestedView;
    view.hidden = !isCurrentView;
    view.classList.toggle("is-active", isCurrentView);
  });
  viewLinks.forEach((link) => {
    const isCurrentLink = link.dataset.viewLink === viewName;
    link.classList.toggle("is-active", isCurrentLink);
    link.toggleAttribute("aria-current", isCurrentLink);
  });
}

function openDialog(dialogId) {
  const dialog = document.getElementById(dialogId);
  if (dialog && !dialog.open) dialog.showModal();
}

function closeContainingDialog(button) { button.closest("dialog")?.close(); }

function loadCollection(storageKey, validator, collectionName) {
  try {
    const storedValue = localStorage.getItem(storageKey);
    if (!storedValue) return [];
    const parsedValue = JSON.parse(storedValue);
    if (!Array.isArray(parsedValue) || !parsedValue.every(validator)) throw new Error("Invalid stored collection.");
    return parsedValue;
  } catch (error) {
    if (collectionName === "project") { projectStorageProblem = true; malformedProjectStorage = true; }
    if (collectionName === "task") { taskStorageProblem = true; malformedTaskStorage = true; }
    return [];
  }
}

function saveCollection(storageKey, collection, collectionName) {
  const hasUnreadableStorage = collectionName === "project" ? malformedProjectStorage : malformedTaskStorage;
  if (hasUnreadableStorage) return false;
  try {
    localStorage.setItem(storageKey, JSON.stringify(collection));
    return true;
  } catch (error) {
    return false;
  }
}

function isValidStoredProject(project) {
  return project && typeof project.id === "string" && typeof project.name === "string" && typeof project.description === "string" && PROJECT_STATUSES.includes(project.status);
}

function isValidStoredTask(task) {
  return task && typeof task.id === "string" && typeof task.title === "string" && typeof task.description === "string" && typeof task.projectId === "string" && TASK_STATUSES.includes(task.status) && TASK_PRIORITIES.includes(task.priority) && (task.dueDate === "" || /^\d{4}-\d{2}-\d{2}$/.test(task.dueDate));
}

function createId(prefix) {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normaliseProjectName(name) { return name.trim().toLocaleLowerCase(); }

function validateProject(name, currentProjectId = null) {
  const trimmedName = name.trim();
  if (!trimmedName) return "Enter a project name.";
  const duplicateProject = projects.find((project) => normaliseProjectName(project.name) === normaliseProjectName(trimmedName) && project.id !== currentProjectId);
  return duplicateProject ? "A project with this name already exists." : "";
}

function validateTask(title, projectId) {
  if (!title.trim()) return "Enter a task title.";
  if (!projectId) return "Select a project for this task.";
  if (!projects.some((project) => project.id === projectId)) return "Select an existing project for this task.";
  return "";
}

function showProjectError(message) {
  projectFormError.textContent = message;
  projectFormError.hidden = false;
  projectNameInput.classList.add("is-invalid");
}

function clearProjectError() {
  projectFormError.textContent = "";
  projectFormError.hidden = true;
  projectNameInput.classList.remove("is-invalid");
}

function showTaskError(message) {
  taskFormError.textContent = message;
  taskFormError.hidden = false;
  taskTitleInput.classList.add("is-invalid");
}

function clearTaskError() {
  taskFormError.textContent = "";
  taskFormError.hidden = true;
  taskTitleInput.classList.remove("is-invalid");
}

function getProjectAccent(projectId) {
  let hash = 0;
  for (const character of projectId) hash = (hash * 31 + character.charCodeAt(0)) >>> 0;
  return `var(--project-accent-${hash % 5})`;
}

function createProjectDot(projectId) {
  const dot = document.createElement("span");
  dot.className = "project-dot";
  dot.style.setProperty("--project-accent", getProjectAccent(projectId));
  dot.setAttribute("aria-hidden", "true");
  return dot;
}

function renderProjects() {
  projectList.replaceChildren();
  if (projects.length === 0) {
    const emptyState = createEmptyState("▣", "No projects yet", "Create your first project to start organizing your work.", "Create your first project", openProjectCreationDialog);
    if (projectStorageProblem) appendStorageWarning(emptyState, "Saved projects could not be read. The stored data has not been changed.");
    projectList.append(emptyState);
  } else {
    const grid = document.createElement("div");
    grid.className = "project-grid";
    projects.forEach((project) => grid.append(createProjectCard(project)));
    projectList.append(grid);
  }
  totalProjectsCount.textContent = String(projects.length);
  totalProjectsNote.textContent = projects.length === 1 ? "1 project saved" : `${projects.length} projects saved`;
  populateProjectControls();
}

function createEmptyState(iconText, headingText, descriptionText, actionText, action) {
  const emptyState = document.createElement("div");
  emptyState.className = "empty-state";
  const icon = document.createElement("span");
  icon.className = "empty-icon";
  icon.setAttribute("aria-hidden", "true");
  icon.textContent = iconText;
  const heading = document.createElement("h2");
  heading.textContent = headingText;
  const description = document.createElement("p");
  description.textContent = descriptionText;
  emptyState.append(icon, heading, description);
  if (actionText) {
    const button = document.createElement("button");
    button.className = "button button-primary";
    button.type = "button";
    button.textContent = actionText;
    button.addEventListener("click", action);
    emptyState.append(button);
  }
  return emptyState;
}

function appendStorageWarning(container, message) {
  const warning = document.createElement("p");
  warning.className = "form-error";
  warning.textContent = message;
  container.append(warning);
}

function createProjectCard(project) {
  const card = document.createElement("article");
  card.className = "project-card";
  card.dataset.projectAccent = "true";
  card.style.setProperty("--project-accent", getProjectAccent(project.id));
  const header = document.createElement("div");
  header.className = "project-card-header";
  const title = document.createElement("h2");
  title.textContent = project.name;
  const status = document.createElement("span");
  status.className = "status-badge";
  status.textContent = project.status;
  header.append(title, status);
  const description = document.createElement("p");
  description.className = "project-description";
  description.textContent = project.description || "No description provided.";
  if (!project.description) description.classList.add("is-empty");
  const progress = createProjectProgress(project);
  const actions = document.createElement("div");
  actions.className = "project-card-actions";
  const editButton = createButton("Edit", "button button-secondary button-small", () => openProjectEditDialog(project.id));
  const deleteButton = createButton("Delete", "button button-danger button-small", () => openProjectDeletionDialog(project.id));
  actions.append(editButton, deleteButton);
  card.append(header, description, progress, actions);
  return card;
}

function getProjectProgress(projectId) {
  const projectTasks = tasks.filter((task) => task.projectId === projectId);
  const completedTasks = projectTasks.filter((task) => task.status === "Completed").length;
  return { total: projectTasks.length, completed: completedTasks, percentage: projectTasks.length ? Math.round((completedTasks / projectTasks.length) * 100) : 0 };
}

function createProjectProgress(project) {
  const progress = getProjectProgress(project.id);
  const container = document.createElement("div");
  container.className = "project-progress";
  const label = document.createElement("div");
  label.className = "project-progress-label";
  const labelText = document.createElement("span");
  labelText.textContent = "Progress";
  const percentage = document.createElement("span");
  percentage.textContent = `${progress.percentage}%`;
  label.append(labelText, percentage);
  const track = document.createElement("div");
  track.className = "progress-track";
  track.setAttribute("role", "progressbar");
  track.setAttribute("aria-label", `${project.name} completion`);
  track.setAttribute("aria-valuemin", "0");
  track.setAttribute("aria-valuemax", "100");
  track.setAttribute("aria-valuenow", String(progress.percentage));
  track.setAttribute("aria-valuetext", `${progress.completed} of ${progress.total} tasks completed, ${progress.percentage}%`);
  const bar = document.createElement("span");
  bar.style.width = `${progress.percentage}%`;
  track.append(bar);
  container.append(label, track);
  return container;
}

function createButton(text, className, action) {
  const button = document.createElement("button");
  button.className = className;
  button.type = "button";
  button.textContent = text;
  button.addEventListener("click", action);
  return button;
}

function populateProjectControls() {
  const selectedFilter = projectFilter.value;
  const selectedTaskProject = taskProjectInput.value;
  const selectedDashboardProject = dashboardProjectFilter.value;
  projectFilter.replaceChildren(new Option("All projects", ""));
  taskProjectInput.replaceChildren(new Option("Select a project", ""));
  dashboardProjectFilter.replaceChildren(new Option("All projects", ""));
  projects.forEach((project) => {
    projectFilter.add(new Option(project.name, project.id));
    taskProjectInput.add(new Option(project.name, project.id));
    dashboardProjectFilter.add(new Option(project.name, project.id));
  });
  if (projects.some((project) => project.id === selectedFilter)) projectFilter.value = selectedFilter;
  if (projects.some((project) => project.id === selectedTaskProject)) taskProjectInput.value = selectedTaskProject;
  if (projects.some((project) => project.id === selectedDashboardProject)) dashboardProjectFilter.value = selectedDashboardProject;
}

function openProjectCreationDialog() {
  editedProjectId = null;
  projectForm.reset();
  projectStatusInput.value = "Planning";
  document.querySelector("[data-project-dialog-eyebrow]").textContent = "New project";
  document.getElementById("project-dialog-title").textContent = "Create a project";
  document.querySelector("[data-project-dialog-intro]").textContent = "Add the work you want to track.";
  document.querySelector("[data-project-submit]").textContent = "Save project";
  clearProjectError();
  openDialog("project-dialog");
  projectNameInput.focus();
}

function openProjectEditDialog(projectId) {
  const project = projects.find((item) => item.id === projectId);
  if (!project) return;
  editedProjectId = project.id;
  projectNameInput.value = project.name;
  projectDescriptionInput.value = project.description;
  projectStatusInput.value = project.status;
  document.querySelector("[data-project-dialog-eyebrow]").textContent = "Edit project";
  document.getElementById("project-dialog-title").textContent = "Update project";
  document.querySelector("[data-project-dialog-intro]").textContent = "Changes are saved when you select Save changes.";
  document.querySelector("[data-project-submit]").textContent = "Save changes";
  clearProjectError();
  openDialog("project-dialog");
  projectNameInput.focus();
}

function saveProject(event) {
  event.preventDefault();
  const name = projectNameInput.value.trim();
  const validationMessage = validateProject(name, editedProjectId);
  if (validationMessage) { showProjectError(validationMessage); return; }
  if (malformedProjectStorage) { showProjectError("Saved project data could not be read, so it has been preserved and this change was not saved."); return; }
  const now = new Date().toISOString();
  const originalProject = projects.find((item) => item.id === editedProjectId);
  const project = { id: editedProjectId || createId("project"), name, description: projectDescriptionInput.value.trim(), status: projectStatusInput.value, createdAt: originalProject?.createdAt || now };
  const nextProjects = editedProjectId ? projects.map((item) => item.id === editedProjectId ? project : item) : [...projects, project];
  if (!saveCollection(PROJECT_STORAGE_KEY, nextProjects, "project")) { showProjectError("Your project could not be saved. Check browser storage, then try again."); return; }
  projects = nextProjects;
  projectStorageProblem = false;
  projectDialog.close();
  renderProjects();
  renderTasks();
  renderDashboard();
}

function getProjectTaskCount(projectId) { return tasks.filter((task) => task.projectId === projectId).length; }

function openProjectDeletionDialog(projectId) {
  const project = projects.find((item) => item.id === projectId);
  if (!project) return;
  projectPendingDeletion = project.id;
  const taskCount = getProjectTaskCount(project.id);
  deleteProjectMessage.textContent = `Delete “${project.name}”? ${taskCount} associated ${taskCount === 1 ? "task" : "tasks"} will also be deleted.`;
  openDialog("delete-project-dialog");
}

function confirmProjectDeletion() {
  if (!projectPendingDeletion) return;
  if (malformedProjectStorage || malformedTaskStorage) {
    deleteProjectMessage.textContent = "Saved data could not be read, so this deletion was not performed.";
    return;
  }
  const nextProjects = projects.filter((project) => project.id !== projectPendingDeletion);
  const nextTasks = tasks.filter((task) => task.projectId !== projectPendingDeletion);
  if (!saveCollection(TASK_STORAGE_KEY, nextTasks, "task")) {
    deleteProjectMessage.textContent = "This deletion could not be saved. No further action was taken.";
    return;
  }
  if (!saveCollection(PROJECT_STORAGE_KEY, nextProjects, "project")) {
    saveCollection(TASK_STORAGE_KEY, tasks, "task");
    deleteProjectMessage.textContent = "This deletion could not be saved. The associated tasks were restored.";
    return;
  }
  projects = nextProjects;
  tasks = nextTasks;
  projectPendingDeletion = null;
  deleteProjectDialog.close();
  renderProjects();
  renderTasks();
  renderDashboard();
}

function openTaskCreationDialog() {
  editedTaskId = null;
  taskForm.reset();
  taskStatusInput.value = "Pending";
  taskPriorityInput.value = "Medium";
  document.querySelector("[data-task-dialog-eyebrow]").textContent = "New task";
  document.getElementById("task-dialog-title").textContent = "Create a task";
  document.querySelector("[data-task-dialog-intro]").textContent = projects.length ? "Break your project into an actionable next step." : "Create a project first, then return here to add a task.";
  document.querySelector("[data-task-submit]").textContent = "Save task";
  clearTaskError();
  openDialog("task-dialog");
  taskTitleInput.focus();
}

function openTaskEditDialog(taskId) {
  const task = tasks.find((item) => item.id === taskId);
  if (!task) return;
  editedTaskId = task.id;
  taskTitleInput.value = task.title;
  taskDescriptionInput.value = task.description;
  taskProjectInput.value = task.projectId;
  taskStatusInput.value = task.status;
  taskPriorityInput.value = task.priority;
  taskDueDateInput.value = task.dueDate;
  document.querySelector("[data-task-dialog-eyebrow]").textContent = "Edit task";
  document.getElementById("task-dialog-title").textContent = "Update task";
  document.querySelector("[data-task-dialog-intro]").textContent = "Changes are saved when you select Save changes.";
  document.querySelector("[data-task-submit]").textContent = "Save changes";
  clearTaskError();
  openDialog("task-dialog");
  taskTitleInput.focus();
}

function saveTask(event) {
  event.preventDefault();
  const title = taskTitleInput.value.trim();
  const projectId = taskProjectInput.value;
  const validationMessage = validateTask(title, projectId);
  if (validationMessage) { showTaskError(validationMessage); return; }
  if (!TASK_STATUSES.includes(taskStatusInput.value) || !TASK_PRIORITIES.includes(taskPriorityInput.value)) { showTaskError("Choose a valid status and priority."); return; }
  if (malformedTaskStorage) { showTaskError("Saved task data could not be read, so it has been preserved and this change was not saved."); return; }
  const now = new Date().toISOString();
  const originalTask = tasks.find((item) => item.id === editedTaskId);
  const task = { id: editedTaskId || createId("task"), title, description: taskDescriptionInput.value.trim(), projectId, status: taskStatusInput.value, priority: taskPriorityInput.value, dueDate: taskDueDateInput.value, createdAt: originalTask?.createdAt || now, updatedAt: now };
  const nextTasks = editedTaskId ? tasks.map((item) => item.id === editedTaskId ? task : item) : [...tasks, task];
  if (!saveCollection(TASK_STORAGE_KEY, nextTasks, "task")) { showTaskError("Your task could not be saved. Check browser storage, then try again."); return; }
  tasks = nextTasks;
  taskStorageProblem = false;
  taskDialog.close();
  renderTasks();
  renderProjects();
  renderDashboard();
}

function renderTasks() {
  taskList.replaceChildren();
  if (projects.length === 0) {
    const state = createEmptyState("▣", "Create a project first", "Tasks need a project before they can be planned.", "Go to projects", () => { showView("projects"); window.history.replaceState(null, "", "#projects"); });
    taskList.append(state);
    return;
  }
  if (taskStorageProblem) {
    const state = createEmptyState("!", "Saved tasks could not be read", "The stored task data has not been changed.", "", null);
    taskList.append(state);
    return;
  }
  const filteredTasks = getFilteredTasks();
  if (tasks.length === 0) {
    taskList.append(createEmptyState("✓", "No tasks yet", "Create a task to turn your project plan into progress.", "Create your first task", openTaskCreationDialog));
    return;
  }
  if (filteredTasks.length === 0) {
    taskList.append(createEmptyState("⌕", "No matching tasks", "Try changing your search or clearing the active filters.", "Clear filters", clearTaskFilters));
    return;
  }
  const stack = document.createElement("div");
  stack.className = "task-stack";
  filteredTasks.forEach((task) => stack.append(createTaskCard(task)));
  taskList.append(stack);
}

function getFilteredTasks() {
  const searchQuery = taskSearchInput.value.trim().toLocaleLowerCase();
  return tasks.filter((task) => {
    const matchesSearch = !searchQuery || task.title.toLocaleLowerCase().includes(searchQuery) || task.description.toLocaleLowerCase().includes(searchQuery);
    return matchesSearch && (!projectFilter.value || task.projectId === projectFilter.value) && (!statusFilter.value || task.status === statusFilter.value) && (!priorityFilter.value || task.priority === priorityFilter.value);
  });
}

function createTaskCard(task) {
  const project = projects.find((item) => item.id === task.projectId);
  const card = document.createElement("article");
  card.className = "task-card";
  const top = document.createElement("div");
  top.className = "task-card-top";
  const titleArea = document.createElement("div");
  const title = document.createElement("h2");
  title.textContent = task.title;
  const projectLabel = document.createElement("p");
  projectLabel.className = "task-project";
  projectLabel.append(createProjectDot(task.projectId), document.createTextNode(project?.name || "Unavailable project"));
  titleArea.append(title, projectLabel);
  const statusSelect = document.createElement("select");
  statusSelect.className = `task-badge badge-${statusClass(task.status)}`;
  statusSelect.setAttribute("aria-label", `Change status for ${task.title}`);
  TASK_STATUSES.forEach((status) => statusSelect.add(new Option(status, status, false, status === task.status)));
  statusSelect.addEventListener("change", () => updateTaskStatus(task.id, statusSelect.value));
  top.append(titleArea, statusSelect);
  card.append(top);
  if (task.description) {
    const description = document.createElement("p");
    description.className = "task-description";
    description.textContent = task.description;
    card.append(description);
  }
  const footer = document.createElement("div");
  footer.className = "task-card-footer";
  const badges = document.createElement("div");
  badges.className = "task-badges";
  badges.append(createBadge(`Priority: ${task.priority}`, `priority-${task.priority.toLowerCase()}`));
  if (task.dueDate) badges.append(createDueDateBadge(task));
  const actions = document.createElement("div");
  actions.className = "task-actions";
  actions.append(createButton("Edit", "button button-secondary button-small", () => openTaskEditDialog(task.id)), createButton("Delete", "button button-danger button-small", () => openTaskDeletionDialog(task.id)));
  footer.append(badges, actions);
  card.append(footer);
  return card;
}

function createBadge(text, className) {
  const badge = document.createElement("span");
  badge.className = `task-badge ${className}`;
  badge.textContent = text;
  return badge;
}

function createDueDateBadge(task) {
  const badge = document.createElement("span");
  const overdue = isTaskOverdue(task);
  badge.className = `due-date${overdue ? " is-overdue" : ""}`;
  badge.textContent = overdue ? `Overdue: ${task.dueDate}` : `Due: ${task.dueDate}`;
  return badge;
}

function statusClass(status) { return status.toLocaleLowerCase().replaceAll(" ", "-"); }

function getTodayLocalDate() {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${today.getFullYear()}-${month}-${day}`;
}

function isTaskOverdue(task) { return Boolean(task.dueDate) && task.dueDate < getTodayLocalDate() && task.status !== "Completed"; }

function getDashboardTasks() {
  const projectId = dashboardProjectFilter.value;
  return projectId ? tasks.filter((task) => task.projectId === projectId) : tasks;
}

function getDashboardScopeLabel() {
  const selectedProject = projects.find((project) => project.id === dashboardProjectFilter.value);
  return selectedProject ? selectedProject.name : "All projects";
}

function renderDashboard() {
  const dashboardTasks = getDashboardTasks();
  const completed = dashboardTasks.filter((task) => task.status === "Completed").length;
  const metrics = {
    total: dashboardTasks.length,
    pending: dashboardTasks.filter((task) => task.status === "Pending").length,
    "in-progress": dashboardTasks.filter((task) => task.status === "In Progress").length,
    completed,
    overdue: dashboardTasks.filter(isTaskOverdue).length,
  };
  const scopeLabel = getDashboardScopeLabel();
  const completion = dashboardTasks.length ? Math.round((completed / dashboardTasks.length) * 100) : 0;
  document.querySelectorAll("[data-dashboard-metric]").forEach((element) => { element.textContent = String(metrics[element.dataset.dashboardMetric]); });
  document.querySelectorAll("[data-dashboard-scope]").forEach((element) => { element.textContent = scopeLabel; });
  dashboardCompletion.textContent = `${completion}%`;
  dashboardProgress.setAttribute("aria-valuenow", String(completion));
  dashboardProgress.setAttribute("aria-valuetext", `${completed} of ${dashboardTasks.length} tasks completed, ${completion}%`);
  dashboardProgress.querySelector("span").style.width = `${completion}%`;
  dashboardProgressText.textContent = dashboardTasks.length ? `${completed} of ${dashboardTasks.length} tasks completed in ${scopeLabel.toLocaleLowerCase()}.` : `No tasks in ${scopeLabel.toLocaleLowerCase()} yet.`;
  renderDashboardProjectOverview();
  renderDashboardRecentTasks(dashboardTasks);
}

function renderDashboardProjectOverview() {
  dashboardProjectOverview.replaceChildren();
  const scopedProjects = dashboardProjectFilter.value ? projects.filter((project) => project.id === dashboardProjectFilter.value) : projects;
  if (!scopedProjects.length) {
    dashboardProjectOverview.append(createDashboardEmpty("Create a project to see its progress here."));
    return;
  }
  const list = document.createElement("div");
  list.className = "dashboard-list";
  scopedProjects.slice(0, 4).forEach((project) => {
    const item = document.createElement("div");
    item.className = "dashboard-list-item";
    const title = document.createElement("div");
    title.className = "dashboard-list-title";
    title.append(createProjectDot(project.id));
    const name = document.createElement("span");
    name.textContent = project.name;
    title.append(name);
    const progress = getProjectProgress(project.id);
    const meta = document.createElement("span");
    meta.className = "dashboard-list-meta";
    meta.textContent = `${progress.percentage}% · ${progress.completed}/${progress.total}`;
    item.append(title, meta);
    list.append(item);
  });
  dashboardProjectOverview.append(list);
}

function renderDashboardRecentTasks(dashboardTasks) {
  dashboardRecentTasks.replaceChildren();
  if (!dashboardTasks.length) {
    dashboardRecentTasks.append(createDashboardEmpty("Add a task to see recent activity here."));
    return;
  }
  const list = document.createElement("div");
  list.className = "dashboard-list";
  dashboardTasks.slice().sort((first, second) => (second.updatedAt || second.createdAt || "").localeCompare(first.updatedAt || first.createdAt || "")).slice(0, 4).forEach((task) => {
    const item = document.createElement("div");
    item.className = "dashboard-list-item";
    const title = document.createElement("div");
    title.className = "dashboard-list-title";
    const name = document.createElement("span");
    name.textContent = task.title;
    title.append(name);
    const meta = document.createElement("span");
    meta.className = "dashboard-list-meta";
    meta.textContent = task.status;
    item.append(title, meta);
    list.append(item);
  });
  dashboardRecentTasks.append(list);
}

function createDashboardEmpty(message) {
  const empty = document.createElement("p");
  empty.className = "dashboard-list-empty";
  empty.textContent = message;
  return empty;
}

function requestSampleData() {
  const hasSampleData = projects.some((project) => project.sample) || tasks.some((task) => task.sample);
  if (hasSampleData) {
    sampleDataMessage.textContent = "Sample data has already been added. Existing projects and tasks were not changed.";
    confirmSampleButton.hidden = true;
    openDialog("sample-data-dialog");
    return;
  }
  if (malformedProjectStorage || malformedTaskStorage) {
    sampleDataMessage.textContent = "Saved data could not be read, so sample data cannot be added without risking existing records.";
    confirmSampleButton.hidden = true;
    openDialog("sample-data-dialog");
    return;
  }
  if (projects.length || tasks.length) {
    sampleDataMessage.textContent = "This will add example projects and tasks alongside your existing data. Nothing will be replaced.";
    confirmSampleButton.hidden = false;
    openDialog("sample-data-dialog");
    return;
  }
  loadSampleData();
}

function loadSampleData() {
  const portfolioName = getAvailableProjectName("Portfolio Refresh");
  const toolkitName = getAvailableProjectName("Developer Toolkit");
  const sampleProjects = [
    { id: createId("project"), name: portfolioName, description: "Update the personal portfolio with recent case studies.", status: "Active", createdAt: new Date().toISOString(), sample: true },
    { id: createId("project"), name: toolkitName, description: "Build reusable tools for everyday development work.", status: "Planning", createdAt: new Date().toISOString(), sample: true },
  ];
  const today = getTodayLocalDate();
  const sampleTasks = [
    { id: createId("task"), title: "Outline portfolio case study", description: "Draft the problem, approach and results sections.", projectId: sampleProjects[0].id, status: "Completed", priority: "Medium", dueDate: "", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), sample: true },
    { id: createId("task"), title: "Audit portfolio content", description: "Review current pages for outdated work and links.", projectId: sampleProjects[0].id, status: "In Progress", priority: "High", dueDate: today, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), sample: true },
    { id: createId("task"), title: "Choose toolkit first release", description: "Prioritize the first reusable developer workflow.", projectId: sampleProjects[1].id, status: "Pending", priority: "Low", dueDate: "", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), sample: true },
  ];
  const nextProjects = [...projects, ...sampleProjects];
  const nextTasks = [...tasks, ...sampleTasks];
  if (!saveCollection(PROJECT_STORAGE_KEY, nextProjects, "project")) return;
  if (!saveCollection(TASK_STORAGE_KEY, nextTasks, "task")) {
    saveCollection(PROJECT_STORAGE_KEY, projects, "project");
    return;
  }
  projects = nextProjects;
  tasks = nextTasks;
  sampleDataDialog.close();
  renderProjects();
  renderTasks();
  renderDashboard();
}

function getAvailableProjectName(baseName) {
  const usedNames = new Set(projects.map((project) => normaliseProjectName(project.name)));
  if (!usedNames.has(normaliseProjectName(baseName))) return baseName;
  let number = 1;
  while (usedNames.has(normaliseProjectName(`${baseName} Sample ${number}`))) number += 1;
  return `${baseName} Sample ${number}`;
}

function updateTaskStatus(taskId, status) {
  if (!TASK_STATUSES.includes(status) || malformedTaskStorage) { renderTasks(); return; }
  const nextTasks = tasks.map((task) => task.id === taskId ? { ...task, status, updatedAt: new Date().toISOString() } : task);
  if (!saveCollection(TASK_STORAGE_KEY, nextTasks, "task")) { renderTasks(); return; }
  tasks = nextTasks;
  renderTasks();
  renderProjects();
  renderDashboard();
}

function openTaskDeletionDialog(taskId) {
  const task = tasks.find((item) => item.id === taskId);
  if (!task) return;
  taskPendingDeletion = task.id;
  deleteTaskMessage.textContent = `Delete “${task.title}”? This action cannot be undone.`;
  openDialog("delete-task-dialog");
}

function confirmTaskDeletion() {
  if (!taskPendingDeletion || malformedTaskStorage) return;
  const nextTasks = tasks.filter((task) => task.id !== taskPendingDeletion);
  if (!saveCollection(TASK_STORAGE_KEY, nextTasks, "task")) { deleteTaskMessage.textContent = "This deletion could not be saved. No changes were made."; return; }
  tasks = nextTasks;
  taskPendingDeletion = null;
  deleteTaskDialog.close();
  renderTasks();
  renderProjects();
  renderDashboard();
}

function clearTaskFilters() {
  taskSearchInput.value = "";
  projectFilter.value = "";
  statusFilter.value = "";
  priorityFilter.value = "";
  renderTasks();
}

function initialiseNavigation() {
  viewLinks.forEach((link) => link.addEventListener("click", (event) => { event.preventDefault(); const viewName = link.dataset.viewLink; showView(viewName); window.history.replaceState(null, "", `#${viewName}`); }));
  const initialView = window.location.hash.slice(1);
  showView(document.querySelector(`[data-view="${initialView}"]`) ? initialView : "dashboard");
}

function initialiseTheme() {
  applyTheme(document.documentElement.dataset.theme || getSystemTheme());
  themeToggle.addEventListener("click", () => { const newTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark"; try { localStorage.setItem(THEME_STORAGE_KEY, newTheme); } catch (error) { /* Theme still applies for this session. */ } applyTheme(newTheme); });
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => { try { if (!localStorage.getItem(THEME_STORAGE_KEY)) applyTheme(event.matches ? "dark" : "light"); } catch (error) { applyTheme(event.matches ? "dark" : "light"); } });
}

function initialiseDialogs() {
  document.querySelectorAll("[data-dialog-open]").forEach((button) => button.addEventListener("click", () => {
    if (button.dataset.dialogOpen === "project-dialog") openProjectCreationDialog();
    else if (button.dataset.dialogOpen === "task-dialog") openTaskCreationDialog();
    else openDialog(button.dataset.dialogOpen);
  }));
  document.querySelectorAll("[data-dialog-close]").forEach((button) => button.addEventListener("click", () => closeContainingDialog(button)));
  document.querySelector("[data-delete-project-confirm]").addEventListener("click", confirmProjectDeletion);
  document.querySelector("[data-delete-task-confirm]").addEventListener("click", confirmTaskDeletion);
  projectForm.addEventListener("submit", saveProject);
  taskForm.addEventListener("submit", saveTask);
  projectNameInput.addEventListener("input", clearProjectError);
  taskTitleInput.addEventListener("input", clearTaskError);
}

function initialiseTaskFilters() {
  [taskSearchInput, projectFilter, statusFilter, priorityFilter].forEach((control) => control.addEventListener("input", renderTasks));
  document.querySelector("[data-clear-task-filters]").addEventListener("click", clearTaskFilters);
  document.querySelector("[data-task-filter-form]").addEventListener("submit", (event) => event.preventDefault());
}

function initialiseDashboard() {
  dashboardProjectFilter.addEventListener("change", renderDashboard);
  document.querySelector("[data-load-sample]").addEventListener("click", requestSampleData);
  confirmSampleButton.addEventListener("click", loadSampleData);
}

initialiseNavigation();
initialiseTheme();
initialiseDialogs();
initialiseTaskFilters();
initialiseDashboard();
renderProjects();
renderTasks();
renderDashboard();
