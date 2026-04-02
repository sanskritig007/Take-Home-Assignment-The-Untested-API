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

  describe('getPaginated', () => {
    it('returns first page from the beginning of the list', () => {
      for (let i = 0; i < 15; i++) {
        taskService.create({ title: `Task ${i}` });
      }

      const page1 = taskService.getPaginated(1, 10);
      expect(page1).toHaveLength(10);
      expect(page1[0].title).toBe('Task 0');
      expect(page1[9].title).toBe('Task 9');
    });

    it('returns remaining records on second page', () => {
      for (let i = 0; i < 15; i++) {
        taskService.create({ title: `Task ${i}` });
      }

      const page2 = taskService.getPaginated(2, 10);
      expect(page2).toHaveLength(5);
      expect(page2[0].title).toBe('Task 10');
    });
  });
});
