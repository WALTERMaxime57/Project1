define(function () {
  return {
    createBtns: function (sParent, sLabel, sClass ,fFunction) {
      var $button = $("<button>");
      $button.addClass(sClass);
      $button.html(sLabel);
      $button.on("click", function(){
        fFunction();
      });
      $(sParent).append($button);

    },

    init: function () {
			this.bindEvents();
			this.updateButtonStates(); // Initial update of button status
			this.restoreButtonStates(); // Restore saved button states
			console.log('%c Les boutons du site sont chargés avec succès', 'color: darkmagenta; background: white; padding: 4px; border: 1px solid darkmagenta; border-radius: 5px;');
		},

		// Ensures that all buttons on the page respond to user interactions
		bindEvents: function () {
			var oSelf = this;

			$(".btn").each(function () {
				// Click event management
				$(this).on("click", function (event) {
					console.log('%c Click détécté sur un bouton', 'color: darkmagenta; background: white; padding: 4px; border: 1px solid darkmagenta; border-radius: 5px;');
					oSelf.handleButtonClick(event);
				});

				// Double-click event management
				$(this).on("dblclick", function (event) {
					console.log('%c Double clic détecté pour le bouton : ' + $(this).text(), 'color: darkmagenta; background: white; padding: 4px; border: 1px solid darkmagenta; border-radius: 5px;');
				});

				// Managing the flyover event
				$(this).on("mouseenter", function () {
					console.log('%c Survol d\'un bouton détécté', 'color: darkmagenta; background: white; padding: 4px; border: 1px solid darkmagenta; border-radius: 5px;');
				});
			});
		},

		// Managing the button's state, and executing or confirming actions
		handleButtonClick: function (event) {
			var $button = $(event.target);
			var sAction = $button.data("action");

			// Click tracking
			this.logButtonClick($button);

			// Button status management (e.g. deactivation after one click)
			this.setButtonState($button, "loading");

			// Confirmation before executing an action
			if (sAction === "delete" || sAction === "critical") {
				var oSelf = this;
				this.confirmAction("Êtes-vous sûr de vouloir effectuer cette action ?", function () {
					oSelf.executeAction($button, sAction);
				});
			} else {
				this.executeAction($button, sAction);
			}
		},

		/* Executes a predefined action or logs an error if the action is undefined
		 * @param ($button) : the button
		 * @param (sAction) : the action (data-action)
		*/
		executeAction: function ($button, sAction) {
			console.log('%c Exécution de l’action : ' + sAction, 'color: darkmagenta; background: white; padding: 4px; border: 1px solid darkmagenta; border-radius: 5px;');
			if (sAction && this.oActions[sAction]) {
				this.oActions[sAction].call(this, $button);
			} else {
				console.warn("Aucune action définie pour : ", sAction);
				this.setButtonState($button, "enabled"); // Reactivate button in the event of an error
			}
		},

		/* Updates the state of a button (e.g., loading, disabled, enabled)
		 * @param ($button) : the button
		 * @param (sState) : the state of the button
		*/
		setButtonState: function ($button, sState) {
			console.log('%c Changement de l’état du bouton : ' + $button.text() + ' à ' + sState, 'color: darkmagenta; background: white; padding: 4px; border: 1px solid darkmagenta; border-radius: 5px;');
			
			switch (sState) {
				case "loading":
					$button.addClass("loading").prop("disabled", true);
					break;
				case "disabled":
					$button.addClass("disabled").prop("disabled", true);
					break;
				case "enabled":
					$button.removeClass("loading disabled").prop("disabled", false);
					break;
				default:
					console.warn("État non reconnu : ", sState);
			}
		},

		// Applies conditional logic to update the states of all buttons on the page
		updateButtonStates: function () {
			$(".btn").each(function () {
				var $button = $(this);
				var sAction = $button.data("action");

				// Example of conditional logic
				if (sAction === "restricted") {
					$button.prop("disabled", true).addClass("disabled");
				} else {
					$button.prop("disabled", false).removeClass("disabled");
				}

				console.log('%c Mise à jour des états des boutons fini', 'color: darkmagenta; background: white; padding: 4px; border: 1px solid darkmagenta; border-radius: 5px;');
			});
		},

		/* Displays a confirmation dialog and executes a callback if the user confirms
		 * @param (sMessage) : the message displayed in the confirm popup
		 * @param (fnCallback) : the function call back if confirm
		*/
		confirmAction: function (sMessage, fnCallback) {
			if (window.confirm(sMessage)) {
				fnCallback();
			}
		},

		/* Logs information about a button click for analytical purposes
		 * @param ($button) : the button
		*/
		logButtonClick: function ($button) {
			var sAction = $button.data("action");
			console.log('%c Clic enregistré pour l’action : ' + sAction, 'color: darkmagenta; background: white; padding: 4px; border: 1px solid darkmagenta; border-radius: 5px;');

			// Example: send an event to an analysis system (Google Analytics, etc.)
		},

		// Saves the current states of all buttons (disabled state and text) to localStorage
		saveButtonStates: function () {
			var aStates = [];
			$(".btn").each(function () {
				aStates.push({
					action: $(this).data("action"),
					disabled: $(this).prop("disabled"),
					text: $(this).text()
				});
			});

			localStorage.setItem("buttonStates", JSON.stringify(aStates));
			console.log('%c État des boutons sauvegardés', 'color: darkmagenta; background: white; padding: 4px; border: 1px solid darkmagenta; border-radius: 5px;');
		},

		// Restores button states (disabled state and text) from localStorage, if available
		restoreButtonStates: function () {
			var aStates = JSON.parse(localStorage.getItem("buttonStates"));

			if (aStates) {
				aStates.forEach(function (state) {
					var $button = $(".btn[data-action='" + state.action + "']");
					if ($button.length) {
						$button.prop("disabled", state.disabled).text(state.text);
						console.log('%c Restauration des boutons fini', 'color: darkmagenta; background: white; padding: 4px; border: 1px solid darkmagenta; border-radius: 5px;');
					}
				});
			}
		},

		/* Dynamically creates a button
		 *
		 * @param (sLabel) : the button text
		 * @param (sContainerSelector) :  the container selector where the button will be added
		 * @param OPTIONAL (sAdditionalClasses) : Add additional CSS classes
		 * @param OPTIONAL (sCustomActionName) : the custom name for data-action
		 * @param (fnOrAction) : the custom action OR the data-action that already exist to call pre-defined action (see oActions)
		 */
		createButton: function (sLabel, sContainerSelector, sAdditionalClasses, sCustomActionName, fnOrAction) {
			var $button = $("<button>")
				.addClass("btn " + (sAdditionalClasses || ""))
				.text(sLabel);

			// If `fnOrAction` is a function, add a custom `data-action` or one generated automatically
			if (typeof fnOrAction === "function") {
				var customActionName = sCustomActionName || "custom-action-" + Math.random().toString(36).substr(2, 12);
				$button.attr("data-action", customActionName);

				// Link the click event to the custom function
				$button.on("click", function () {
					fnOrAction.call(this, $button);
				});
			}
			// If `fnOrAction` is a string, use it as the predefined action
			else if (typeof fnOrAction === "string") {
				$button.attr("data-action", fnOrAction);

				// Check and link the predefined action
				if (this.oActions[fnOrAction]) {
					var oSelf = this;
					$button.on("click", function () {
						oSelf.logButtonClick($button);
						oSelf.oActions[fnOrAction].call(oSelf, $button);
					});
				} else {
					console.warn("Aucune action prédéfinie trouvée pour :", fnOrAction);
				}
			}
			// Managing cases where `fnOrAction` is invalid
			else {
				console.warn("Argument invalide pour `fnOrAction` :", fnOrAction);
			}

			// Add the button to the container
			$(sContainerSelector).append($button);

			console.log('%c Bouton créé avec succès : ' + sLabel, 'color: darkmagenta; background: white; padding: 4px; border: 1px solid darkmagenta; border-radius: 5px;');
		},

		/* Removes buttons with a specific action
		 * @param (sAction) : the action (data-action)
		*/
		removeButtons: function (sAction) {
			$(".btn").filter(function () {
				return $(this).data("action") === sAction;
			}).remove();
			console.log('%c Bouton supprimé avec succès', 'color: darkmagenta; background: white; padding: 4px; border: 1px solid darkmagenta; border-radius: 5px;');
		},

		/* Updates the appearance (CSS classes) and optionally the text of buttons with a specific action
		 * @param (sAction) : the action (data-action)
		 * @param (sNewClasses) : the new classes added to button
		 * @param (sNewText) : the new text showed
		*/
		customizeButton: function (sAction, sNewClasses, sNewText) {
			$(".btn").filter(function () {
				return $(this).data("action") === sAction;
			}).each(function () {
				$(this).attr("class", "btn " + sNewClasses);
				if (sNewText) {
					$(this).text(sNewText);
				}
				console.log('%c Bouton customisé avec succès', 'color: darkmagenta; background: white; padding: 4px; border: 1px solid darkmagenta; border-radius: 5px;');
			});
		},

		/* Displays feedback text next to a button for a specified duration
		 * @param ($button) : the button
		 * @param (sFeedbackText) : the feedback label displayed
		 * @param (sFeedbackType) : the type of the feedback
		*/
		showFeedback: function ($button, sFeedbackText, sFeedbackType) {
			var $feedback = $("<span>")
				.addClass("feedback " + (sFeedbackType || "success"))
				.text(sFeedbackText);

			$button.after($feedback);

			console.log('%c Feedback du bouton affiché avec succès', 'color: darkmagenta; background: white; padding: 4px; border: 1px solid darkmagenta; border-radius: 5px;');

			// Suppress feedback after a certain time
			setTimeout(function () {
				$feedback.fadeOut(function () {
					$(this).remove();
				});
			}, 3000);
		},

		// Binds specific keyboard shortcuts to actions, triggering the respective buttons when keys are pressed
		bindKeyboardShortcuts: function () {
			$(document).on("keydown", function (event) {
				// Example: Key ‘D’ for the ‘delete’ action, “C” for ‘customAction’.
				var oActionMap = {
					68: "delete",       // "D" button
					67: "customAction"  // "C" button
				};

				var sAction = oActionMap[event.which];
				if (sAction) {
					var $button = $(".btn[data-action='" + sAction + "']");
					if ($button.length) {
						$button.trigger("click");
					}
				}
			});
		},

		/* Observes changes in a container and applies events to new buttons dynamically added
		 * @param (sContainerSelector) : the parent container selector
		*/
		observeButtonContainer: function (sContainerSelector) {
			var oSelf = this;

			// Container selection with jQuery
			var $container = $(sContainerSelector);

			// Checks whether the container exists and is a valid node
			if ($container.length > 0) {
				var observer = new MutationObserver(function (mutations) {
					mutations.forEach(function (mutation) {
						if (mutation.addedNodes.length) {
							oSelf.bindEvents(); // Applies events to new buttons
						}
					});
				});

				// Look at the native DOM container (not the jQuery object)
				observer.observe($container[0], { childList: true, subtree: true });
				console.log('%c Observer attaché au conteneur : ' + sContainerSelector, 'color: darkmagenta; background: white; padding: 4px; border: 1px solid darkmagenta; border-radius: 5px;');
			} else {
				console.warn("Conteneur introuvable pour le sélecteur :", sContainerSelector);
			}
		},

		//  Defines a set of predefined actions that buttons can perform
		oActions: {
			delete: function ($button) {
				alert("Suppression effectuée !");
				console.log('%c Suppression en cours pour :', $button, 'color: darkmagenta; background: white; padding: 4px; border: 1px solid darkmagenta; border-radius: 5px;');
				this.setButtonState($button, "enabled");
			},

			restricted: function ($button) {
				alert("Vous n'avez pas les permissions nécessaires pour effectuer cette action.");
				console.log('%c Bouton restreint cliqué', 'color: darkmagenta; background: white; padding: 4px; border: 1px solid darkmagenta; border-radius: 5px;');
				this.setButtonState($button, "enabled");
			},

			critical: function ($button) {
				console.log('%c Action critique exécutée', 'color: darkmagenta; background: white; padding: 4px; border: 1px solid darkmagenta; border-radius: 5px;');
				alert("Action critique exécutée avec succès !");
				this.setButtonState($button, "enabled");
			}
		}
  };


});
