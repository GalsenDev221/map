import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

interface Contributor {
  id: number;
  name: string;
  city: string;
  stack: string[];
  github: string;
  lat: number;
  lng: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Méthode non autorisée" });
  }

  try {
    const { name, city, stack, github, lat, lng } = req.body;

    // Validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return res.status(400).json({ error: "Nom invalide" });
    }

    if (!city || typeof city !== "string") {
      return res.status(400).json({ error: "Ville invalide" });
    }

    if (!Array.isArray(stack) || stack.length === 0) {
      return res.status(400).json({ error: "Stack technique invalide" });
    }

    if (!github || typeof github !== "string") {
      return res.status(400).json({ error: "Lien GitHub invalide" });
    }

    if (typeof lat !== "number" || typeof lng !== "number") {
      return res.status(400).json({ error: "Coordonnées invalides" });
    }

    // Read existing contributors
    const contributorsPath = path.join(
      process.cwd(),
      "data",
      "contributors.json"
    );
    const contributorsData = fs.readFileSync(contributorsPath, "utf8");
    const contributors: Contributor[] = JSON.parse(contributorsData);

    // Check if GitHub profile already exists
    const existingContributor = contributors.find(
      (c) => c.github.toLowerCase() === github.toLowerCase()
    );
    if (existingContributor) {
      return res
        .status(400)
        .json({ error: "Ce profil GitHub est déjà enregistré" });
    }

    // Generate new ID
    const newId = Math.max(...contributors.map((c) => c.id), 0) + 1;

    // Create new contributor
    const newContributor: Contributor = {
      id: newId,
      name: name.trim(),
      city: city.trim(),
      stack: stack.map((tech: string) => tech.trim()).filter(Boolean),
      github: github.trim(),
      lat,
      lng,
    };

    // Add to array
    contributors.push(newContributor);

    // Write back to file
    fs.writeFileSync(contributorsPath, JSON.stringify(contributors, null, 2));

    res.status(200).json({
      message: "Profil ajouté avec succès",
      contributor: newContributor,
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout du contributeur:", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
}
