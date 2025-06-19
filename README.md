# 🦇 Batman POV Image Generator

Un générateur d'images basé sur l'IA qui crée des scènes de point de vue (POV) de Batman en utilisant Stable Diffusion. Ce projet combine un backend FastAPI avec un frontend React pour offrir une expérience utilisateur intuitive de génération d'images.

## 🚀 Fonctionnalités

- **Génération d'images par IA** : Utilise Stable Diffusion v1.5 pour créer des images de haute qualité
- **Interface utilisateur moderne** : Frontend React avec une interface simple et intuitive
- **API RESTful** : Backend FastAPI pour la génération d'images
- **Support GPU/CPU** : Optimisation automatique selon les ressources disponibles
- **Tunnel ngrok** : Exposition publique de l'API pour l'utilisation en développement
- **Gestion des erreurs** : Interface utilisateur avec gestion des erreurs et états de chargement

## 🏗️ Architecture du Projet

```
Ai-image-generator/
├── backend/                 # Backend FastAPI
│   ├── main.py             # Serveur principal avec API
│   └── requirements.txt    # Dépendances Python
├── frontend/               # Frontend React
│   ├── src/
│   │   ├── App.jsx         # Composant principal
│   │   └── main.jsx        # Point d'entrée React
│   ├── index.html          # Page HTML principale
│   ├── package.json        # Dépendances Node.js
│   └── vite.config.js      # Configuration Vite
├── generated/              # Dossier pour les images générées
└── *.ipynb                 # Notebooks Colab pour le déploiement
```

## 🛠️ Technologies Utilisées

### Backend
- **FastAPI** : Framework web moderne et rapide pour Python
- **Stable Diffusion** : Modèle d'IA pour la génération d'images
- **PyTorch** : Framework de deep learning
- **Diffusers** : Bibliothèque Hugging Face pour les modèles de diffusion
- **Pillow (PIL)** : Traitement d'images
- **Uvicorn** : Serveur ASGI pour FastAPI
- **Pyngrok** : Tunnel pour exposer l'API localement
- **Pydantic** : Validation de données

### Frontend
- **React 18** : Bibliothèque JavaScript pour les interfaces utilisateur
- **Vite** : Outil de build rapide pour le développement
- **CSS-in-JS** : Styles intégrés dans les composants React

## 📋 Prérequis

- Python 3.8+
- Node.js 16+
- GPU compatible CUDA (recommandé pour de meilleures performances)
- Compte ngrok (pour l'exposition publique)

## 🔧 Installation

### 1. Cloner le projet
```bash
git clone <repository-url>
cd Ai-image-generator
```

### 2. Configuration du Backend

```bash
cd backend
pip install -r requirements.txt
```

### 3. Configuration du Frontend

```bash
cd frontend
npm install
```

## 🚀 Utilisation

### Démarrage du Backend

```bash
cd backend
python main.py
```

Le serveur démarrera sur `http://localhost:8000` et affichera l'URL ngrok publique.

### Démarrage du Frontend

```bash
cd frontend
npm run dev
```

L'application sera accessible sur `http://localhost:5173`.

### Utilisation de l'Application

1. Ouvrez votre navigateur et accédez à `http://localhost:5173`
2. Entrez une description de la scène Batman POV que vous souhaitez générer
3. Cliquez sur "Generate Image"
4. Attendez que l'image soit générée (peut prendre quelques secondes)
5. L'image générée s'affichera sous le formulaire

## 🔌 API Endpoints

### POST /generate
Génère une image basée sur un prompt textuel.

**Request Body:**
```json
{
  "prompt": "Description de la scène Batman POV"
}
```

**Response:**
```json
{
  "message": "Image generated successfully",
  "image_base64": "base64_encoded_image_data"
}
```

## 🎯 Exemples de Prompts

- "Batman standing on a rooftop overlooking Gotham City at night"
- "Batman's point of view from the Batmobile driving through the city"
- "Batman looking down from a gargoyle on a gothic building"
- "Batman's perspective from the Batcave with computer screens"

## 🔧 Configuration

### Variables d'Environnement

Le projet utilise des configurations par défaut, mais vous pouvez personnaliser :

- **BACKEND_URL** : URL du backend (définie dans `App.jsx`)
- **Model** : Modèle Stable Diffusion (actuellement "runwayml/stable-diffusion-v1-5")

### Optimisations GPU

Le système détecte automatiquement si CUDA est disponible et optimise en conséquence :
- Utilise `torch.float16` avec GPU pour de meilleures performances
- Utilise `torch.float32` avec CPU comme fallback

## 🐛 Dépannage

### Problèmes Courants

1. **Erreur CUDA** : Assurez-vous que PyTorch est installé avec le support CUDA
2. **Erreur ngrok** : Vérifiez que votre compte ngrok est configuré
3. **Erreur CORS** : Le backend est configuré pour accepter toutes les origines en développement

### Logs et Debug

- Les logs du backend s'affichent dans la console
- L'URL ngrok publique est affichée au démarrage
- Les erreurs frontend sont affichées dans l'interface utilisateur

## 📝 Développement

### Structure des Composants

- **App.jsx** : Composant principal avec la logique de génération d'images
- **État local** : Gestion des états loading, error, et imageUrl
- **Gestion d'erreurs** : Try-catch avec affichage des erreurs utilisateur

### Améliorations Possibles

- Ajout de paramètres de génération (taille, style, etc.)
- Historique des images générées
- Sauvegarde des images sur le serveur
- Interface d'administration
- Support de plusieurs modèles d'IA

## 📄 Licence

Ce projet est fourni à des fins éducatives et de démonstration.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Signaler des bugs
- Proposer de nouvelles fonctionnalités
- Améliorer la documentation
- Optimiser les performances

---

**Note** : Ce projet utilise des modèles d'IA qui peuvent nécessiter des ressources importantes. Pour de meilleures performances, utilisez un GPU compatible CUDA. 