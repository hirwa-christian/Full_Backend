# Internal Developer Guide

# Testing Strategy & Execution Flow

## 1. Purpose

This document defines the official testing standards for the project. It
establishes:

- Folder structure
- Test responsibilities
- Mocking rules
- Execution commands
- CI expectations

All developers must follow this structure when writing or updating
tests.

---

## 2. Folder Structure

    /tests
      /unit
      /integration
      /e2e

Each folder contains only its corresponding test type. Mixing test types
is not allowed.

---

## 3. Unit Tests

### Objective

Validate isolated logic in complete separation from infrastructure.

### Must Mock

- Database (Prisma repositories)
- RabbitMQ
- External APIs
- File system

### Must NOT Use

- Real database
- Real message brokers
- Real network calls

### Execution

```bash
npm run test:unit
```

### Configuration

    jest.config.unit.ts

---

## 4. Integration Tests

### Objective

Verify internal modules working together.

### Real

- Prisma
- Test database
- Application services

### Mocked

- External APIs

### Execution

```bash
npm run test:integration
```

### Configuration

    jest.config.integration.ts

---

## 5. End-to-End (E2E) Tests

### Objective

Validate complete production-like flows.

### Must Be Real

- Application server
- Database
- RabbitMQ
- External APIs (sandbox)

No mocking allowed.

### Execution

```bash
npm run test:e2e
```

### Configuration

    jest.config.e2e.ts

---

## 6. NPM Scripts

```json
{
  "scripts": {
    "test:unit": "jest --config jest.config.unit.ts",
    "test:integration": "jest --config jest.config.integration.ts",
    "test:e2e": "jest --config jest.config.e2e.ts"
  }
}
```

---

## 7. Mocking Rules Summary

Layer DB RabbitMQ External APIs

---

Unit Mocked Mocked Mocked
Integration Real Optional Mocked
E2E Real Real Real

---

## 8. CI/CD Policy

CI must run: - Unit tests - Integration tests

E2E tests should run: - On staging pipeline - Nightly - Before
production release

---

## 9. Core Principles

- Do not mix test types.
- If mocking is required, it is NOT E2E.
- If real infrastructure is used, it is NOT unit.
- Every feature must include appropriate tests.
