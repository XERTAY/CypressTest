# Test Todo App

## Environnement d’Exécution

- **Navigateur :** Firefox  
- **Système d’exploitation :** Windows 11

---

## 1. Scénarios Validés

### Page d’Accueil
- **Titre "My Tasks" :** Présent et correctement affiché.
- **État vide :** Le message "You have no tasks" apparaît en absence de tâches.
- **Bouton "New Task" :** Affiché.

### Ajout de Tâches
- **Cas standard :**  
  - Création réussie avec titre "Test Title" et résumé "Test Task" (titre et résumé visibles, bouton de suppression actif).
- **Cas d’erreur :**  
  - Aucune tâche ajoutée si le titre est vide.  
  - *Observation :* Pas d’affichage du “You have no tasks”.

### Suppression de Tâches
- **Suppression unitaire :** La tâche disparaît de l’interface après clic sur le bouton associé. Le message d’état vide réapparaît.

### Thème (Mode Clair/Sombre)
- **Basculement :** Le fond passe de blanc à `rgb(26,27,30)` selon le mode sélectionné.  
  - *Observation :* Si la couleur change, cela peut fausser le test. On s'est donc posé la question de savoir si calculer la luminance de la couleur du body et comparer les deux couleurs serait un test plus robuste.

---

## 2. Tests de Robustesse et Cas Limites

### Entrées Utilisateur
- **Espaces vides :**  
  - Un titre composé uniquement d’espaces ne devrait pas être accepté.
- **Texte multi-ligne :**  
  - Les sauts de ligne dans le résumé devraient être conservés à l’affichage.
- **Longueurs extrêmes :**  
  - Titre de 1 000 caractères et résumé de 2 000 caractères affiché (mais pas visuellement).
- **Caractères spéciaux :**  
  - Unicode (ex. 😀, 日本), backslash (`\`), etc. – Aucune exécution de code détectée.

### Bug de Doublons
- **Clics rapides sur "Create Task" :**  
  - Création de plusieurs instances d’une même tâche (confirmé par comptage des éléments DOM).

### Persistance des Données
- **Rechargement de page :**  
  - Les tâches restent visibles après actualisation.
- **Suppression post-rechargement :**  
  - La suppression est persistante après une nouvelle actualisation.

---

## 3. Résilience

- **Effacement du localStorage :**  
  - L’interface revient à l’état initial ("You have no tasks").

---

## 4. Observations Techniques

### Sélecteurs DOM
- **Observation :**  
  Les tests reposent sur le contenu textuel et la structure HTML, ce qui les rend vulnérables aux modifications d’interface.
- **Recommandation :**  
  Implémenter des attributs dédiés (ex. `data-cy`) pour une meilleure condition de test.

### Sécurité des Entrées
- **Observation :**  
  Pas de vulnérabilité à priori, pas de défaut sur des caractères spéciaux (à part le `\`).

---

## 5. Conclusion

L’application satisfait aux fonctionnalités principales (ajout/suppression de tâches, persistance, thème). Les tests ont révélé :
- Un bug de duplication de tâches lors de clics rapides.
- Pas de problème sur les entrées utilisateur (validation, sécurité).
- Un manque d’ergonomie de l’application (message d’erreur, texte inexistant).

**Recommandation :**  
Ajouter des attributs de test ou des classes parlantes pour une future amélioration du site afin de permettre des tests automatisés plus robustes (ex. `[data-cy="delete-task-button"]`).
