define(function () {
    return {
        createInput: function (sParent, sPlaceHolder ,sType, sClass ,iFunction, fFunction,) {
        var $input = $('<input type="' + sType + '">');
        $input.attr("placeholder", sPlaceHolder);
        $input.addClass(sClass);
        $input.on(iFunction ,function(){
          fFunction();
        })
        $(sParent).prepend($input);
        console.log($input);
      },

      createOptions : function(aOptions, sParent){
        console.log(aOptions)
        var iLenghtOptions = aOptions.length;
        console.log(iLenghtOptions);
        for(i = 0; i < iLenghtOptions; i++){
          if(i === 0){
            var $options = $('<option>');
            $options.attr("value", i);
            // $options.attr("disable selected");
            $options.attr("disabled", true);
            $options.attr("selected", true);
            $options.html(aOptions[i]);
            console.log(aOptions[i])
            $(sParent).append($options);
            console.log(sParent)
          }else{
            var $options = $('<option>');
            $options.attr("value", i)
            $options.html(aOptions[i]);
            $(sParent).append($options);
          }
        }
      },

      createSelec : function (sParent, sClass, aOptions){
        var $selec = $("<select>");
        $selec.addClass(sClass);
        $(sParent).append($selec);

        if (Array.isArray(aOptions) && aOptions.length > 0) {
          this.createOptions(aOptions, $selec); // Utilisation de createOptions pour ajouter les options
        }
      },

      // Initializing the controller
		init: function () {
			this.bindEvents();
			console.log('%c Les inputs du site sont chargés avec succès', 'color: darkblue; background: white; padding: 4px; border: 1px solid darkblue; border-radius: 5px;');
		},

		// Ensures that all inputs on the page respond to user interactions
		bindEvents: function () {
			var oSelf = this;

			$(".input").each(function () {
				// Focus event management
				$(this).on("focus", function () {
					console.log('%c Focus détecté sur un input', 'color: darkblue; background: white; padding: 4px; border: 1px solid darkblue; border-radius: 5px;');
				});

				// Blur event management
				$(this).on("blur", function () {
					console.log('%c Blur détecté sur un input', 'color: darkblue; background: white; padding: 4px; border: 1px solid darkblue; border-radius: 5px;');
				});

				// Input event management
				$(this).on("input", function () {
					console.log('%c Modification détectée sur un input', 'color: darkblue; background: white; padding: 4px; border: 1px solid darkblue; border-radius: 5px;');
				});
			});
		},

		/* Dynamically creates an input field
		 * @param (sType) : the input type (e.g., text, number, password, etc.)
		 * @param (sContainerSelector) : the container selector where the input will be added
		 * @param OPTIONAL (oOptions) : additional parameters for customization
		 * - id (unique identifier for the input)
		 * - maxLength (for text)
		 * - min, max (for number)
		 * - placeholder
		 * - iconPosition (left or right)
		 * - iconClass (CSS class for the icon)
		 */
		createInput1: function (sType, sContainerSelector, oOptions) {
			oOptions = oOptions || {};

			var $inputWrapper = $("<div>").addClass("input-wrapper");
			var $input = $("<input>").attr("type", sType).addClass("input");

			// Assign an ID if provided
			if (oOptions.id) {
				$input.attr("id", oOptions.id);
			}

			// Apply additional parameters based on the input type
			if (sType === "text" && oOptions.maxLength) {
				$input.attr("maxlength", oOptions.maxLength);
			}

			if (sType === "number") {
				if (oOptions.min !== undefined) {
					$input.attr("min", oOptions.min);
				}
				if (oOptions.max !== undefined) {
					$input.attr("max", oOptions.max);
				}
			}

			if (oOptions.placeholder) {
				$input.attr("placeholder", oOptions.placeholder);
			}

			// Add an icon if specified
			if (oOptions.iconClass) {
				var $icon = $("<span>").addClass("input-icon " + oOptions.iconClass);
				if (oOptions.iconPosition === "right") {
					$inputWrapper.append($input).append($icon);
				} else {
					$inputWrapper.append($icon).append($input);
				}
			} else {
				$inputWrapper.append($input);
			}

			// Add the input to the container
			$(sContainerSelector).append($inputWrapper);

			console.log('%c Input créé avec succès', 'color: darkblue; background: white; padding: 4px; border: 1px solid darkblue; border-radius: 5px;');
		},

		/* Updates the appearance (CSS classes) and optionally the placeholder of inputs with a specific type or ID
		* @param (sIdentifier) : the input type (e.g., text, number, password, etc.) or a specific ID
		* @param (sNewClasses) : the new classes added to input
		* @param (sNewPlaceholder) : the new placeholder text
		*/
		customizeInput: function (sIdentifier, sNewClasses, sNewPlaceholder) {
			if (sIdentifier.startsWith("#")) {
				// Customize by ID
				var $input = $(sIdentifier);
				if ($input.length) {
					$input.attr("class", "input " + sNewClasses);
					if (sNewPlaceholder) {
						$input.attr("placeholder", sNewPlaceholder);
					}
					console.log('%c Input avec ID customisé avec succès', 'color: darkblue; background: white; padding: 4px; border: 1px solid darkblue; border-radius: 5px;');
				} else {
					console.warn('%c Aucun input trouvé avec cet ID', 'color: darkred; background: white; padding: 4px; border: 1px solid darkred; border-radius: 5px;');
				}
			} else {
				// Customize by type
				$(".input").filter(function () {
					return $(this).attr("type") === sIdentifier;
				}).each(function () {
					$(this).attr("class", "input " + sNewClasses);
					if (sNewPlaceholder) {
						$(this).attr("placeholder", sNewPlaceholder);
					}
					console.log('%c Input customisé avec succès', 'color: darkblue; background: white; padding: 4px; border: 1px solid darkblue; border-radius: 5px;');
				});
			}
		},

		/* Displays feedback text next to an input for a specified duration
		 * @param ($input) : the input
		 * @param (sFeedbackText) : the feedback label displayed
		 * @param (sFeedbackType) : the type of the feedback
		 */
		showFeedback: function ($input, sFeedbackText, sFeedbackType) {
			var $feedback = $("<span>")
				.addClass("feedback " + (sFeedbackType || "success"))
				.text(sFeedbackText);

			$input.after($feedback);

			console.log('%c Feedback de l\'input affiché avec succès', 'color: darkblue; background: white; padding: 4px; border: 1px solid darkblue; border-radius: 5px;');

			// Suppress feedback after a certain time
			setTimeout(function () {
				$feedback.fadeOut(function () {
					$(this).remove();
				});
			}, 3000);
		},

		/* Dynamically observes a container for changes (e.g., added or removed inputs)
		 * @param (sContainerSelector) : the container to observe
		 */
		observeInputContainer: function (sContainerSelector) {
			var oSelf = this;
			var targetNode = document.querySelector(sContainerSelector);

			if (!targetNode) {
				console.warn('%c Conteneur introuvable', 'color: darkred; background: white; padding: 4px; border: 1px solid darkred; border-radius: 5px;');
				return;
			}

			// Create a MutationObserver instance
			var observer = new MutationObserver(function (mutationsList) {
				mutationsList.forEach(function (mutation) {
					if (mutation.type === "childList") {
						// Log added nodes
						mutation.addedNodes.forEach(function (node) {
							if (node.nodeType === 1 && node.matches(".input-wrapper")) {
								console.log('%c Input ajouté dans le conteneur', 'color: darkblue; background: white; padding: 4px; border: 1px solid darkblue; border-radius: 5px;');
								oSelf.bindEvents();
							}
						});

						// Log removed nodes
						mutation.removedNodes.forEach(function (node) {
							if (node.nodeType === 1 && node.matches(".input-wrapper")) {
								console.log('%c Input supprimé du conteneur', 'color: darkred; background: white; padding: 4px; border: 1px solid darkred; border-radius: 5px;');
							}
						});
					}
				});
			});

			// Observer options
			var config = {
				childList: true,
				subtree: false
			};

			// Start observing the container
			observer.observe(targetNode, config);
			console.log('%c Observation du conteneur démarrée', 'color: darkblue; background: white; padding: 4px; border: 1px solid darkblue; border-radius: 5px;');
		},

		/* Removes inputs by type or ID
		 * @param (sIdentifier) : the input type (e.g., text, number, password, etc.) or a specific ID
		 */
		removeInputs: function (sIdentifier) {
			if (sIdentifier.startsWith("#")) {
				// Remove by ID
				$(sIdentifier).closest(".input-wrapper").remove();
				console.log('%c Input avec ID supprimé avec succès', 'color: darkblue; background: white; padding: 4px; border: 1px solid darkblue; border-radius: 5px;');
			} else {
				// Remove by type
				$(".input").filter(function () {
					return $(this).attr("type") === sIdentifier;
				}).closest(".input-wrapper").remove();
				console.log('%c Input de type supprimé avec succès', 'color: darkblue; background: white; padding: 4px; border: 1px solid darkblue; border-radius: 5px;');
			}
		}
    };
  
  
  });
