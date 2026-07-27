import fs from "node:fs";

import { formatDate, getAllPosts, getPost } from "./posts";

jest.mock("node:fs");

const mockedFs = fs as jest.Mocked<typeof fs>;

const POST_A = `---
title: "Post A"
description: "Descripción A"
date: "2026-01-10"
tags: ["nextjs", "seo"]
---

Contenido A.`;

const POST_B = `---
title: "Post B"
description: "Descripción B"
date: "2026-03-05"
---

Contenido B.`;

describe("getAllPosts", () => {
  it("devuelve [] si no existe el directorio de blog", () => {
    mockedFs.existsSync.mockReturnValue(false);
    expect(getAllPosts()).toEqual([]);
  });

  it("ordena los posts del más reciente al más viejo", () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readdirSync.mockReturnValue(["post-a.mdx", "post-b.mdx", "nota.txt"] as never);
    mockedFs.readFileSync.mockImplementation((filePath) => {
      const file = String(filePath);
      if (file.endsWith("post-a.mdx")) return POST_A;
      if (file.endsWith("post-b.mdx")) return POST_B;
      throw new Error(`fixture no esperado: ${file}`);
    });

    const posts = getAllPosts();

    expect(posts.map((p) => p.slug)).toEqual(["post-b", "post-a"]);
    expect(posts[1]).toEqual({
      slug: "post-a",
      title: "Post A",
      description: "Descripción A",
      date: "2026-01-10",
      tags: ["nextjs", "seo"],
    });
  });

  it("ignora archivos que no son .mdx", () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readdirSync.mockReturnValue(["post-a.mdx", "README.md"] as never);
    mockedFs.readFileSync.mockReturnValue(POST_A);

    expect(getAllPosts()).toHaveLength(1);
  });
});

describe("getPost", () => {
  it("rechaza slugs con path traversal o caracteres fuera del patrón", () => {
    expect(getPost("../../etc/passwd")).toBeNull();
    expect(getPost("Post_A")).toBeNull();
    expect(getPost("post a")).toBeNull();
    expect(mockedFs.readFileSync).not.toHaveBeenCalled();
  });

  it("devuelve null si el slug es válido pero el archivo no existe", () => {
    mockedFs.existsSync.mockReturnValue(false);
    expect(getPost("no-existe")).toBeNull();
  });

  it("devuelve el post cuando el slug y el archivo son válidos", () => {
    mockedFs.existsSync.mockReturnValue(true);
    mockedFs.readFileSync.mockReturnValue(POST_B);

    const post = getPost("post-b");

    expect(post?.meta.title).toBe("Post B");
    expect(post?.meta.tags).toEqual([]);
    expect(post?.content.trim()).toBe("Contenido B.");
  });
});

describe("formatDate", () => {
  it("formatea en español, larga, sin desfase de zona horaria", () => {
    expect(formatDate("2026-01-10")).toBe("10 de enero de 2026");
  });
});
