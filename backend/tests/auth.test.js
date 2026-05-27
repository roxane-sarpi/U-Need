const { hashPassword } = require('../src/auth');

describe('hashPassword middleware', () => {
  test('doit hasher le mot de passe et le placer dans req.body.hashedPassword', async () => {
    const req = { body: { password: 'MonMotDePasse123' } };
    const res = {};
    const next = jest.fn();

    await new Promise((resolve) => {
      hashPassword(req, res, () => { next(); resolve(); });
    });

    expect(next).toHaveBeenCalled();
    expect(req.body.hashedPassword).toBeDefined();
    expect(req.body.password).toBeUndefined();
    expect(req.body.hashedPassword).toMatch(/^\$argon2/);
  });

  test('le hash doit être différent à chaque appel (sel aléatoire)', async () => {
    const req1 = { body: { password: 'test' } };
    const req2 = { body: { password: 'test' } };

    await new Promise(r => hashPassword(req1, {}, r));
    await new Promise(r => hashPassword(req2, {}, r));

    expect(req1.body.hashedPassword).not.toBe(req2.body.hashedPassword);
  });
});
