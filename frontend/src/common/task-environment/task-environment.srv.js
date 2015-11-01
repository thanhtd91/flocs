/*
 * Task Environment Service
 */
angular.module('flocs.taskEnvironment')
.factory('taskEnvironmentService', ['taskDao', 'mazeService', 'workspaceService',
    function (taskDao, mazeService, workspaceService) {

  var currentTask = null;
  var afterAttemptCallback = null;
  //var changeListeners = [];
  var blocksStatus = {
    used: null,
    limit: null
  };
  var toolsStatus = {
    picked: null,
    all: null
  };

  workspaceService.addChangeListener(handleWorkspaceChange);
  mazeService.addChangeListener(handleMazeChange);

  // === public API ===
  return {
    settingNextTask: settingNextTask,
    settingTaskById: settingTaskById,
    setInitialState: setInitialState,
    attemptFinished: attemptFinished,

    // NOTE: we have used shared data (blocksStatus instead of listeners)
    //addChangeListener: addChangeListener,
    //getBlocksUsed: getBlocksUsed,
    //getBlocksLimit: getBlocksLimit,

    // shared data
    blocksStatus: blocksStatus,
    toolsStatus: toolsStatus


    //getMazeSettings: getMazeSettings,
    //getWorkspaceSettings: getWorkspaceSettings,
    //reportResults: reportResults,
    //taskFinished: taskFinished
  };

  // === private implementation ===

  /**
   * Add new listener which will be called when the environment changes.
   */
  /*function addChangeListener(listener) {
    changeListeners.push(listener);

    // if a task has been already set, call the listener to get initital state
    if (currentTask !== null) {
      listener();
    }
  }*/

  /**
   * Call all change listeners
   */
  /*function changeNotification() {
    angular.forEach(changeListeners, function(listener) {
      listener();
    });
  }*/

  function getMazeSettings() {
    if (currentTask === null) {
      return null;
    }
    return currentTask['maze-settings'];
  }

  function getWorkspaceSettings() {
    if (currentTask === null) {
      return null;
    }
    return currentTask['workspace-settings'];
  }

  function getBlocksUsed() {
    return workspaceService.getBlocksUsed();
  }

  function getBlocksLimit() {
    return workspaceService.getBlocksLimit();
  }

  function getToolsPicked() {
    return mazeService.getToolsPicked();
  }

  function getToolsAll() {
    return mazeService.getToolsAll();
  }

  function setTask(newTask) {
    currentTask = newTask;
    mazeService.set(getMazeSettings());
    workspaceService.set(getWorkspaceSettings());
    //changeNotification();
  }

  function setInitialState() {
    mazeService.reset();
  }

  function settingTaskById(id) {
    taskDao.gettingTaskById(id)
      .then(function(newTask) {
        setTask(newTask);
      });
  }

  function settingNextTask(callback) {
    afterAttemptCallback = callback;
    var taskPromise = taskDao.gettingNextTask()
      .then(function(newTask) {
        setTask(newTask);
        return newTask;
      });
    return taskPromise;
  }

  function attemptFinished(result) {
    if (afterAttemptCallback) {
      afterAttemptCallback(result);
    }

    //$rootScope.$broadcast('task:attemptFinished');
    //console.log(result);
  }

  function handleWorkspaceChange() {
    //changeNotification();
    blocksStatus.used = getBlocksUsed();
    blocksStatus.limit = getBlocksLimit();
  }

  function handleMazeChange() {
    toolsStatus.picked = getToolsPicked();
    toolsStatus.all = getToolsAll();
  }

}]);
