// scripts/build-users.js
import fs from "fs";
import path from "path";

const USERS_DIR = "./data/contributors";
const OUTPUT_FILE = "./data/contributors.json";

const users = [];

// Lire tous les fichiers JSON dans /data/contributors
fs.readdirSync(USERS_DIR).forEach((file) => {
  if (file.endsWith(".json")) {
    const content = fs.readFileSync(path.join(USERS_DIR, file), "utf-8");
    try {
      const user = JSON.parse(content);
      users.push(user);
    } catch (error) {
      console.error(`❌ Erreur dans le fichier ${file}:`, error.message);
    }
  }
});

// Sauvegarder dans contributeurs.json
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(users, null, 2));
console.log(`${users.length} utilisateurs ajoutés à ${OUTPUT_FILE}`);
