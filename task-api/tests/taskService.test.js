const taskService = require('../src/services/taskService');

describe('Task Service', () => {
  beforeEach(() => {
    taskService._reset();
  });

  describe('create', () => {
    it('creates a task with defaults', () => {
      const task = taskService.create({ title: 'Test Task' });

      expect(task).toHaveProperty('id');
      expect(task.title).toBe('Test Task');
      expect(task.status).toBe('todo');
      expect(task.priority).toBe('medium');
      expect(task.completedAt).toBeNull();
    });
  });

  describe('getByStatus', () => {
    it('returns only exact status matches', () => {
      taskService.create({ title: 'Todo Task', status: 'todo' });
      taskService.create({ title: 'Done Task', status: 'done' });

      const todoTasks = taskService.getByStatus('todo');
      expect(todoTasks).toHaveLength(1);
      expect(todoTasks[0].title).toBe('Todo Task');
    });

    it('does not treat partial strings as matches', () => {
      taskService.create({ title: 'Todo Task', status: 'todo' });
      taskService.create({ title: 'Done Task', status: 'done' });

      const partialMatches = taskService.getByStatus('o');
      expect(partialMatches).toHaveLength(0);
    });
  });
});
