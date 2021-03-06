# Migration `20200427130857-delete-posts--add-roles`

This migration has been generated by Oliver Evans at 4/27/2020, 1:08:57 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TYPE "Role" AS ENUM ('Employee', 'Manager', 'Admin');

ALTER TABLE "public"."User" DROP COLUMN "name",
ADD COLUMN "createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN "familyName" text  NOT NULL ,
ADD COLUMN "givenName" text  NOT NULL ,
ADD COLUMN "roles" "Role"[]  ;

ALTER TABLE "public"."Post" DROP CONSTRAINT IF EXiSTS "Post_authorId_fkey";

DROP TABLE "public"."Post";
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200427125200-initial-migration..20200427130857-delete-posts--add-roles
--- datamodel.dml
+++ datamodel.dml
@@ -3,22 +3,21 @@
 }
 datasource db {
   provider = "postgres"
-  url = "***"
+  url      = env("DATABASE_URI")
 }
 model User {
-  id    Int     @default(autoincrement()) @id
-  email String  @unique
-  name  String?
-  posts Post[]
+  id         Int      @default(autoincrement()) @id
+  createdAt  DateTime @default(now())
+  email      String   @unique
+  givenName  String
+  familyName String
+  roles      Role[]
 }
-model Post {
-  id        Int     @default(autoincrement()) @id
-  authorId  Int?
-  content   String?
-  published Boolean @default(false)
-  title     String
-  author    User?   @relation(fields: [authorId], references: [id])
+enum Role {
+  Employee
+  Manager
+  Admin
 }
```


