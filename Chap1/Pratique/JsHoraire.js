// 1) Au chargement de la page, les réponses du questionnaire doivent être invisibles

const answers = document.querySelectorAll('.questionnaire > dd'); //all dit qu'on fait un tableau avec tous les sélécteurs, > dd veut dire enfant direct de la balise dd
answers.forEach(answer => answer.classList.add('hidden')); 

// 2) Lorsque l’utilisateur clique sur une des questions, la réponse adéquate doit être repectivement affichée si actuellement cachée ou cachée si actuellement affichée
//permet d'ajouter/supprimer dynamiquement une classe

const questions = document.querySelectorAll('.questionnaire dt'); //dans un tableau
for (const question of questions) {
  question.addEventListener('click', evt => {
    question.nextElementSibling.classList.toggle('hidden');
  })
}

// 3) Au chargement de la page, toutes les questions du formulaire seront respectivement préfixées d’une numérotation Q1, Q2, et Q3
document.addEventListener("DOMContentLoaded", (event) => {
  let i  = 0;
  for (const question of questions){
    question.textContent = "Q" + (i+1) + " " + question.textContent;
    i++;
  }
});

//autre méthode avec la boucle foreach
// questions.forEach((question, i) => {
//   question.textContent = "Mais ouais" + (i + 1) + "---" + question.textContent; 
// });

// 4) Les définitions "dd" qui ne sont pas dans le questionnaire doivent s’afficher en rouge lorsque la souris passe sur eux et redevenir comme avant lorsque la souris quitte la définition

const DD = document.querySelectorAll(':not(.questionnaire) > dd'); //l'espace c'est l'enfant le > c'est le direct
for (const definition of DD) {
  definition.addEventListener('mouseover', evt => {
    definition.classList.add('highlight'); 
  })
}
for (const definition of DD) {
  definition.addEventListener('mouseout', evt => {
    definition.classList.remove('highlight'); 
  })
}

// 5) Les liens qui font référence à une adresse HTTP externe doivent être mise en orange
const BaliseLien = document.querySelectorAll('[href^=http]'); //pour pouvoir chercher quelque chose qui ressemble à... 
BaliseLien.forEach(a => a.classList.add('externalLink')); 

// 6) Le petit formulaire en bas de page doit permettre l’ajout d’une nouvelle note dans la liste des notes
//Création de fonctions aides qu'on va bcp utiliser durant le développement
function domForEach(selector, callback){
  document.querySelectorAll(selector).forEach(callback);
}

function domOn(selector, event, callback, options){
  domForEach(selector, ele => ele.addEventListener(event, callback, options)); 
}
//Il faut commencer par annuler le comportement par défaut du formulaire

domOn('form', 'submit', evt =>{ //aller pointer vers la balise form quand y'a un envoie de la part de l'utilisateur
  evt.preventDefault(); 

  const txt = document.getElementById('newNote').value; //ici on veut récupérer le contenu 
  const p = document.createElement('p'); //création d'un nouveau paragraphe
  p.textContent = txt; //venir remplir notre nouveau p avec le texte envoyé par l'utilisateur avec le submit
  document.getElementById('notes'). appendChild(p); //venir ajouter en dernier enfant de la liste de note notre p

  //Vider le formulaire (donc venir lui changer sa valeur par rien)
  document.getElementById('newNote'). value = ' '; 
}) 

// 7) Lorsque la souris passe sur une des notes, son fond devient rouge, il redevient de la couleur par défaut lorsque la souris quitte la note

const notes = document.getElementById('notes'); 
const mouseHandler = evt => {
  let p = evt.target.closest('p'); 
  if(!notes.contains(p)) return; 
  p.classList.toggle('warning'); 
}
domOn('#notes', 'mouseover', mouseHandler);
domOn('#notes', 'mouseout', mouseHandler);