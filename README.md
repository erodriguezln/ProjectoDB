```bash
npm install
npx prisma generate
npx prisma migrate dev
npx prisma db seed
npm run dev
```

```yaml
services:
  projectoDB:
    container_name: projectoDB
    image: postgres:14
    environment:
      POSTGRES_USER: root
      POSTGRES_PASSWORD: root
      POSTGRES_DB: projectodb
    ports:
      - "5432:5432"
    volumes:
      - db_data:/var/lib/postgresql/data

volumes:
  db_data:
```
