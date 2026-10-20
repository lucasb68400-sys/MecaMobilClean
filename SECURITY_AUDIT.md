# Audit de sécurité et plan de stabilisation

Date : 2026-10-20

## Périmètre et limites

Audit statique du code accessible dans le dépôt. L'application n'a pas été exécutée, testée sur appareil, ni soumise à une analyse dynamique. Les constats ci-dessous doivent être vérifiés par des tests avant toute mise en production.

## Priorités

### P0 — Ne pas traiter l'authentification locale comme une sécurité réelle

- Dans `App.js`, l'inscription stocke `userData` et `isAuthenticated` dans `@react-native-async-storage/async-storage`. Cela peut convenir à un prototype local, mais ne constitue pas une authentification serveur ni une identité partagée entre appareils.
- La proposition de modification de la PR #1 ajoute un mot de passe à `formData` et utilise le stockage local. Un mot de passe ne doit pas être stocké en clair dans AsyncStorage.
- Avant un lancement réel, utiliser un fournisseur d'authentification éprouvé ou un backend sécurisé. Le serveur doit vérifier les identifiants, gérer les sessions/tokens, appliquer les autorisations et stocker les mots de passe avec un hachage adapté (jamais réversible). Ne pas inventer un mécanisme cryptographique maison.
- Ne pas fusionner la PR #1 tant que ces points, les dépendances et les fichiers ajoutés n'ont pas été vérifiés.

### P1 — Choisir une seule application et aligner les dépendances

Le dépôt contient deux projets Expo :
- Racine : `package.json` indique Expo 54, React 18.2 et React Native 0.76.9.
- Sous-dossier `MecaMobilClean/` : `package.json` indique Expo ~54.0.10, React 19.1 et React Native 0.81.4, mais `App.tsx` est encore l'écran de démarrage Expo.

Ces versions divergentes sont un risque important de démarrage et de maintenance. Confirmer quelle application est la source de vérité, puis aligner les versions sur celles prises en charge par la version Expo choisie. Ne pas supprimer l'un des projets avant d'avoir confirmé qu'il n'y a pas de travail utile à récupérer.

### P1 — Vérifier la PR #1

La PR #1 modifie plusieurs fichiers et ajoute `validation.js`. Avant toute fusion :
- vérifier que chaque import pointe vers un fichier existant dans la branche proposée ;
- vérifier que toutes les dépendances importées sont déclarées ;
- exécuter l'installation propre, le contrôle TypeScript/ESLint si configuré et le démarrage Expo ;
- tester inscription, erreurs de formulaire, connexion, déconnexion et redémarrage ;
- retirer tout stockage local de mots de passe.

### P2 — Compléter et tester les fonctions métier

Les écrans de profil, carte, devis, demandes et messages doivent être testés individuellement. Pour un service multi-utilisateur, les demandes et devis doivent être validés et conservés côté serveur, avec des contrôles d'accès par rôle. L'interface seule ne doit jamais décider des droits d'accès.

## Plan de travail recommandé

1. Identifier le projet principal et créer une installation reproductible.
2. Documenter le modèle de données et les rôles (client, mécanicien, administrateur si nécessaire).
3. Choisir une solution d'authentification/backend adaptée avant de coder la connexion réelle.
4. Implémenter l'authentification sans stockage local de mots de passe.
5. Ajouter des tests de parcours et de permissions.
6. Faire une revue de sécurité et de confidentialité avant publication.

## Décision actuelle

Ne pas fusionner la PR #1 et ne pas utiliser l'application avec de vrais comptes tant que l'authentification n'est pas remplacée et que les dépendances ne sont pas stabilisées. Ce document est un plan de correction, pas une certification de sécurité.
