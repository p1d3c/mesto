/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/Api.js":
/*!*******************************!*\
  !*** ./src/components/Api.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Api)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Api = /*#__PURE__*/function () {
  function Api(_ref) {
    var baseUrl = _ref.baseUrl,
        headers = _ref.headers,
        renderCardsCallback = _ref.renderCardsCallback,
        setUserInfoCallback = _ref.setUserInfoCallback,
        addNewCardCallback = _ref.addNewCardCallback;

    _classCallCheck(this, Api);

    this._baseUrl = baseUrl;
    this._headers = headers;
    this._renderCardsCallback = renderCardsCallback;
    this._setUserInfoCallback = setUserInfoCallback;
    this._addNewCardCallback = addNewCardCallback;
  }

  _createClass(Api, [{
    key: "getInitialCards",
    value: function getInitialCards() {
      var _this = this;

      fetch(this._baseUrl + '/cards', {
        headers: this._headers
      }).then(function (res) {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
      }).then(function (res) {
        _this._renderInitialCards(res);
      });
    }
  }, {
    key: "_renderInitialCards",
    value: function _renderInitialCards(items) {
      this._renderCardsCallback(items);
    }
  }, {
    key: "getUserInfo",
    value: function getUserInfo(avatarImg) {
      var _this2 = this;

      fetch(this._baseUrl + '/users/me', {
        headers: this._headers
      }).then(function (res) {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
      }).then(function (res) {
        avatarImg.src = res.avatar;

        _this2._setUserInfoCallback(res);
      });
    }
  }, {
    key: "setUserinfo",
    value: function setUserinfo(_ref2) {
      var _this3 = this;

      var name = _ref2.name,
          about = _ref2.about;
      fetch(this._baseUrl + '/users/me', {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: about
        })
      }).then(function (res) {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
      }).then(function (res) {
        _this3._setUserInfoCallback(res);
      });
    }
  }, {
    key: "addCard",
    value: function addCard(_ref3) {
      var _this4 = this;

      var name = _ref3.name,
          link = _ref3.link;
      fetch(this._baseUrl + '/cards', {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          link: link
        })
      }).then(function (res) {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
      }).then(function (res) {
        _this4._addNewCardCallback(res);
      });
    }
  }, {
    key: "delCard",
    value: function delCard(cardId) {
      fetch(this._baseUrl + "/cards/".concat(cardId), {
        method: 'DELETE',
        headers: this._headers
      }).then(function (res) {
        if (res.ok) {
          return;
        }

        return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
      });
    }
  }, {
    key: "likeCard",
    value: function likeCard(_ref4) {
      var cardId = _ref4.cardId,
          changeLikeBtnView = _ref4.changeLikeBtnView;
      fetch(this._baseUrl + "/cards/".concat(cardId, "/likes"), {
        method: 'PUT',
        headers: this._headers
      }).then(function (res) {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
      }).then(function (res) {
        changeLikeBtnView(res);
      });
    }
  }, {
    key: "dislikeCard",
    value: function dislikeCard(_ref5) {
      var cardId = _ref5.cardId,
          changeLikeBtnView = _ref5.changeLikeBtnView;
      fetch(this._baseUrl + "/cards/".concat(cardId, "/likes"), {
        method: 'DELETE',
        headers: this._headers
      }).then(function (res) {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
      }).then(function (res) {
        changeLikeBtnView(res);
      }).catch(function (err) {
        console.log(cardId);
        console.log(err);
      });
    }
  }, {
    key: "changeAvatar",
    value: function changeAvatar(avatarPopupInputValue, avatarImg) {
      fetch(this._baseUrl + "/users/me/avatar", {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: avatarPopupInputValue.avatar
        })
      }).then(function (res) {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(res.status));
      }).then(function () {
        avatarImg.src = avatarPopupInputValue.avatar;
      }).catch(function (err) {
        console.log(err);
      });
    }
  }]);

  return Api;
}();



/***/ }),

/***/ "./src/components/Card.js":
/*!********************************!*\
  !*** ./src/components/Card.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Card)
/* harmony export */ });
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/utils */ "./src/utils/utils.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var Card = /*#__PURE__*/function () {
  function Card(_ref) {
    var _this = this;

    var data = _ref.data,
        handleImgClick = _ref.handleImgClick,
        handleDelClick = _ref.handleDelClick,
        handleLike = _ref.handleLike,
        handleDislike = _ref.handleDislike,
        templateSelector = _ref.templateSelector;

    _classCallCheck(this, Card);

    _defineProperty(this, "likeCard", function () {
      if (_this._likeBtn.classList.contains('element__heart_active')) {
        _this._dislikeCallback();
      } else {
        _this._likeCallback();
      }
    });

    this._imgCallback = handleImgClick;
    this._delCallback = handleDelClick;
    this._likeCallback = handleLike;
    this._dislikeCallback = handleDislike;
    this._name = data.name;
    this._link = data.link;
    this._alt = data.name;
    this._data = data;
    this._templateSelector = templateSelector;
  }

  _createClass(Card, [{
    key: "createCard",
    value: function createCard() {
      this._elementCard = document.querySelector(this._templateSelector).content.querySelector('.element').cloneNode(true);
      this._img = this._elementCard.querySelector('.element__image');
      this._title = this._elementCard.querySelector('.element__title');
      this._likeBtn = this._elementCard.querySelector('.element__heart');
      this._delBtn = this._elementCard.querySelector('.element__button');
      this._likesCount = this._elementCard.querySelector('.element__likes-count');
      this._img.src = this._link;
      this._img.alt = this._alt;
      this._title.textContent = this._name;
      this._likesCount.textContent = this._data.likes.length || '0';

      this._isOwner();

      this._setEventListeners();

      return this._elementCard;
    }
  }, {
    key: "delCard",
    value: function delCard() {
      this._elementCard.remove();

      this._elementCard = null;
      this._delBtn = null;
      this._likeBtn = null;
      this._img = null;
    }
  }, {
    key: "changeBtnView",
    value: function changeBtnView(res) {
      this._likeBtn.classList.toggle('element__heart_active');

      this._likesCount.textContent = res.likes.length;
    }
  }, {
    key: "_setEventListeners",
    value: function _setEventListeners() {
      var _this2 = this;

      this._delBtn.addEventListener('click', function (evt) {
        return _this2._delCallback(evt);
      });

      this._likeBtn.addEventListener('click', this.likeCard);

      this._img.addEventListener('click', function () {
        return _this2._imgCallback();
      });
    }
  }, {
    key: "_isOwner",
    value: function _isOwner() {
      var _this3 = this;

      if (this._data.owner._id != _utils_utils__WEBPACK_IMPORTED_MODULE_0__.ownerId) {
        this._delBtn.style.display = 'none';
      }

      this._data.likes.forEach(function (userLike) {
        if (userLike._id === _utils_utils__WEBPACK_IMPORTED_MODULE_0__.ownerId) {
          _this3._likeBtn.classList.toggle('element__heart_active');
        }
      });
    }
  }]);

  return Card;
}();



/***/ }),

/***/ "./src/components/FormValidator.js":
/*!*****************************************!*\
  !*** ./src/components/FormValidator.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FormValidator)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var FormValidator = /*#__PURE__*/function () {
  function FormValidator(selectorsConfig, formSelector) {
    _classCallCheck(this, FormValidator);

    this._inputSelector = selectorsConfig.inputSelector;
    this._submitButtonSelector = selectorsConfig.submitButtonSelector;
    this._inactiveButtonClass = selectorsConfig.inactiveButtonClass;
    this._inputErrorClass = selectorsConfig.inputErrorClass;
    this._errorClass = selectorsConfig.errorClass;
    this._form = document.querySelector(formSelector);
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
  }

  _createClass(FormValidator, [{
    key: "enableValidation",
    value: function enableValidation() {
      this._form.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });

      this._setEventListeners();
    }
  }, {
    key: "_setEventListeners",
    value: function _setEventListeners() {
      var _this = this;

      this._toggleButtonState();

      this._inputList.forEach(function (inputElement) {
        inputElement.addEventListener('input', function () {
          _this._checkInputValidity(inputElement);

          _this._toggleButtonState();
        });
      });
    }
  }, {
    key: "_checkInputValidity",
    value: function _checkInputValidity(inputElement) {
      if (!inputElement.validity.valid) {
        this._showInputError(inputElement, inputElement.validationMessage);
      } else {
        this._hideInputError(inputElement);
      }
    }
  }, {
    key: "_showInputError",
    value: function _showInputError(inputElement, errorMessage) {
      var errorElement = this._form.querySelector(".".concat(inputElement.id, "-error"));

      inputElement.classList.add(this._inputErrorClass);
      errorElement.textContent = errorMessage;
      errorElement.classList.add(this._errorClass);
    }
  }, {
    key: "_hideInputError",
    value: function _hideInputError(inputElement) {
      var errorElement = this._form.querySelector(".".concat(inputElement.id, "-error"));

      inputElement.classList.remove(this._inputErrorClass);
      errorElement.classList.remove(this._errorClass);
      errorElement.textContent = '';
    }
  }, {
    key: "_toggleButtonState",
    value: function _toggleButtonState() {
      if (this._hasInvalidInput(this._inputList)) {
        this.disableButton(this._buttonElement, this._inactiveButtonClass);
      } else {
        this.activateButton(this._buttonElement, this._inactiveButtonClass);
      }
    }
  }, {
    key: "_hasInvalidInput",
    value: function _hasInvalidInput() {
      return this._inputList.some(function (inputElement) {
        return !inputElement.validity.valid;
      });
    }
  }, {
    key: "disableButton",
    value: function disableButton() {
      this._buttonElement.classList.add(this._inactiveButtonClass);

      this._buttonElement.setAttribute('disabled', true);
    }
  }, {
    key: "activateButton",
    value: function activateButton() {
      this._buttonElement.classList.remove(this._inactiveButtonClass);

      this._buttonElement.removeAttribute('disabled', true);
    }
  }, {
    key: "hideErrorMessage",
    value: function hideErrorMessage() {
      var _this2 = this;

      this._inputList.forEach(function (input) {
        _this2._hideInputError(input);
      });
    }
  }]);

  return FormValidator;
}();



/***/ }),

/***/ "./src/components/Popup.js":
/*!*********************************!*\
  !*** ./src/components/Popup.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Popup)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Popup = /*#__PURE__*/function () {
  function Popup(_ref) {
    var _this = this;

    var popup = _ref.popup;

    _classCallCheck(this, Popup);

    _defineProperty(this, "_handleEscClose", function (evt) {
      if (evt.key === 'Escape') {
        _this.close();
      }
    });

    this._popup = popup;
    this._closeBtn = this._popup.querySelector('.popup__close-btn');
    this._popupOverlay = this._popup.querySelector('.popup__overlay');
  }

  _createClass(Popup, [{
    key: "open",
    value: function open() {
      this._popup.classList.add('popup_opened');
    }
  }, {
    key: "close",
    value: function close() {
      this._popup.classList.remove('popup_opened');
    }
  }, {
    key: "setEventListeners",
    value: function setEventListeners() {
      var _this2 = this;

      this._closeBtn.addEventListener('click', function () {
        return _this2.close();
      });

      this._popupOverlay.addEventListener('click', function () {
        return _this2.close();
      });

      document.addEventListener('keydown', this._handleEscClose);
    }
  }]);

  return Popup;
}();



/***/ }),

/***/ "./src/components/PopupWithConfirmation.js":
/*!*************************************************!*\
  !*** ./src/components/PopupWithConfirmation.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PopupWithConfirmation)
/* harmony export */ });
/* harmony import */ var _Popup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup */ "./src/components/Popup.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var PopupWithConfirmation = /*#__PURE__*/function (_Popup) {
  _inherits(PopupWithConfirmation, _Popup);

  var _super = _createSuper(PopupWithConfirmation);

  function PopupWithConfirmation(_ref) {
    var _this;

    var popup = _ref.popup;

    _classCallCheck(this, PopupWithConfirmation);

    _this = _super.call(this, {
      popup: popup
    });

    _defineProperty(_assertThisInitialized(_this), "_handleSubmitCallback", function (evt) {
      _this._submitCallback(evt);
    });

    _this._form = _this._popup.querySelector('.popup__form');
    return _this;
  }

  _createClass(PopupWithConfirmation, [{
    key: "setSubmitAction",
    value: function setSubmitAction(action) {
      this._submitCallback = action;

      this._form.addEventListener('submit', this._handleSubmitCallback);
    }
  }]);

  return PopupWithConfirmation;
}(_Popup__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/components/PopupWithForm.js":
/*!*****************************************!*\
  !*** ./src/components/PopupWithForm.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PopupWithForm)
/* harmony export */ });
/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ "./src/components/Popup.js");
/* harmony import */ var _selectorsConfig_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./selectorsConfig.js */ "./src/components/selectorsConfig.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var PopupWithForm = /*#__PURE__*/function (_Popup) {
  _inherits(PopupWithForm, _Popup);

  var _super = _createSuper(PopupWithForm);

  function PopupWithForm(_ref) {
    var _this;

    var popup = _ref.popup,
        submitFormCallback = _ref.submitFormCallback;

    _classCallCheck(this, PopupWithForm);

    _this = _super.call(this, {
      popup: popup
    });

    _defineProperty(_assertThisInitialized(_this), "_handleSubmit", function (evt) {
      _this._callback(evt);
    });

    _this._callback = submitFormCallback;
    _this._form = _this._popup.querySelector(_selectorsConfig_js__WEBPACK_IMPORTED_MODULE_1__.selectorsConfig.formSelector);
    _this._inputSelector = _selectorsConfig_js__WEBPACK_IMPORTED_MODULE_1__.selectorsConfig.inputSelector;
    _this._submitBtn = _this._popup.querySelector('.popup__submit');
    return _this;
  }

  _createClass(PopupWithForm, [{
    key: "getInputValues",
    value: function getInputValues() {
      var _this2 = this;

      this._inputList = this._popup.querySelectorAll(this._inputSelector);
      this._formValues = {};

      this._inputList.forEach(function (input) {
        _this2._formValues[input.name] = input.value;
      });

      return this._formValues;
    }
  }, {
    key: "_removeEventListeners",
    value: function _removeEventListeners() {
      this._submitBtn.removeEventListener('submit', this._handleSubmit);
    }
  }, {
    key: "setEventListeners",
    value: function setEventListeners() {
      _get(_getPrototypeOf(PopupWithForm.prototype), "setEventListeners", this).call(this);

      this._form.addEventListener('submit', this._handleSubmit);
    }
  }, {
    key: "close",
    value: function close() {
      _get(_getPrototypeOf(PopupWithForm.prototype), "close", this).call(this);

      this._form.reset();
    }
  }]);

  return PopupWithForm;
}(_Popup_js__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/components/PopupWithImage.js":
/*!******************************************!*\
  !*** ./src/components/PopupWithImage.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PopupWithImage)
/* harmony export */ });
/* harmony import */ var _Popup_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Popup.js */ "./src/components/Popup.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var PopupWithImage = /*#__PURE__*/function (_Popup) {
  _inherits(PopupWithImage, _Popup);

  var _super = _createSuper(PopupWithImage);

  function PopupWithImage(_ref) {
    var _this;

    var popup = _ref.popup;

    _classCallCheck(this, PopupWithImage);

    _this = _super.call(this, {
      popup: popup
    });
    _this._image = _this._popup.querySelector('.popup__image');
    _this._caption = _this._popup.querySelector('.popup__caption');
    return _this;
  }

  _createClass(PopupWithImage, [{
    key: "open",
    value: function open(cardData) {
      _get(_getPrototypeOf(PopupWithImage.prototype), "open", this).call(this);

      _get(_getPrototypeOf(PopupWithImage.prototype), "setEventListeners", this).call(this);

      this._image.src = cardData.link;
      this._image.alt = cardData.name;
      this._caption.textContent = cardData.name;
    }
  }]);

  return PopupWithImage;
}(_Popup_js__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/components/Section.js":
/*!***********************************!*\
  !*** ./src/components/Section.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Section)
/* harmony export */ });
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/utils */ "./src/utils/utils.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }



var Section = /*#__PURE__*/function () {
  function Section(_ref, containerSelector) {
    var renderer = _ref.renderer;

    _classCallCheck(this, Section);

    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  _createClass(Section, [{
    key: "renderItems",
    value: function renderItems(items) {
      var _this = this;

      items.forEach(function (item) {
        // if (item.owner._id === ownerId) {
        _this._renderer(item); // }

      });
    }
  }, {
    key: "addItem",
    value: function addItem(element, method) {
      if (method === 'start') {
        this._container.prepend(element);
      } else {
        this._container.append(element);
      }
    }
  }]);

  return Section;
}();



/***/ }),

/***/ "./src/components/UserInfo.js":
/*!************************************!*\
  !*** ./src/components/UserInfo.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UserInfo)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var UserInfo = /*#__PURE__*/function () {
  function UserInfo(_ref) {
    var nameSelector = _ref.nameSelector,
        jobSelector = _ref.jobSelector;

    _classCallCheck(this, UserInfo);

    this._userName = document.querySelector(nameSelector);
    this._userJob = document.querySelector(jobSelector);
  }

  _createClass(UserInfo, [{
    key: "getUserInfo",
    value: function getUserInfo() {
      return {
        userName: this._userName.textContent,
        userJob: this._userJob.textContent
      };
    }
  }, {
    key: "setUserInfo",
    value: function setUserInfo(_ref2) {
      var name = _ref2.name,
          job = _ref2.job;
      this._userName.textContent = name;
      this._userJob.textContent = job;
    }
  }]);

  return UserInfo;
}();



/***/ }),

/***/ "./src/components/selectorsConfig.js":
/*!*******************************************!*\
  !*** ./src/components/selectorsConfig.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "selectorsConfig": () => (/* binding */ selectorsConfig)
/* harmony export */ });
var selectorsConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  fieldSelector: '.popup__form-set',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};


/***/ }),

/***/ "./src/utils/utils.js":
/*!****************************!*\
  !*** ./src/utils/utils.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "token": () => (/* binding */ token),
/* harmony export */   "ownerId": () => (/* binding */ ownerId),
/* harmony export */   "editBtn": () => (/* binding */ editBtn),
/* harmony export */   "addBtn": () => (/* binding */ addBtn),
/* harmony export */   "avatarBtn": () => (/* binding */ avatarBtn),
/* harmony export */   "profilePopupElement": () => (/* binding */ profilePopupElement),
/* harmony export */   "addCardPopupElement": () => (/* binding */ addCardPopupElement),
/* harmony export */   "imgPopupElement": () => (/* binding */ imgPopupElement),
/* harmony export */   "delCardPopupElement": () => (/* binding */ delCardPopupElement),
/* harmony export */   "avatarPopupElement": () => (/* binding */ avatarPopupElement),
/* harmony export */   "profNameSelector": () => (/* binding */ profNameSelector),
/* harmony export */   "profJobSelector": () => (/* binding */ profJobSelector),
/* harmony export */   "profilePopupName": () => (/* binding */ profilePopupName),
/* harmony export */   "profilePopupJob": () => (/* binding */ profilePopupJob),
/* harmony export */   "editFormElementSelector": () => (/* binding */ editFormElementSelector),
/* harmony export */   "editSubmitBtn": () => (/* binding */ editSubmitBtn),
/* harmony export */   "nameInput": () => (/* binding */ nameInput),
/* harmony export */   "jobInput": () => (/* binding */ jobInput),
/* harmony export */   "addFormElementSelector": () => (/* binding */ addFormElementSelector),
/* harmony export */   "addSubmitBtn": () => (/* binding */ addSubmitBtn),
/* harmony export */   "titleInput": () => (/* binding */ titleInput),
/* harmony export */   "linkInput": () => (/* binding */ linkInput),
/* harmony export */   "avatarFormElementSelector": () => (/* binding */ avatarFormElementSelector),
/* harmony export */   "avatarImg": () => (/* binding */ avatarImg),
/* harmony export */   "cardListSelector": () => (/* binding */ cardListSelector),
/* harmony export */   "templateSelector": () => (/* binding */ templateSelector)
/* harmony export */ });
var token = '1fc6d210-8890-4051-a715-d0338c476cfd';
var ownerId = 'dfde4bcda101257a7e2cdc57';
var editBtn = document.querySelector('.profile__edit-btn');
var addBtn = document.querySelector('.profile__add-btn');
var avatarBtn = document.querySelector('.profile__edit-pen');
var profilePopupElement = document.querySelector('.popup_type_edit');
var addCardPopupElement = document.querySelector('.popup_type_add');
var imgPopupElement = document.querySelector('.popup_type_img');
var delCardPopupElement = document.querySelector('.popup_type_del-confirm');
var avatarPopupElement = document.querySelector('.popup_type_avatar');
var profNameSelector = '.profile__title';
var profJobSelector = '.profile__subtitle';
var profilePopupName = document.querySelector('.popup__input_type_name');
var profilePopupJob = document.querySelector('.popup__input_type_job');
var editFormElementSelector = '.popup__form_type_edit';
var editSubmitBtn = document.querySelector('button[name="edit-submit"]');
var nameInput = document.querySelector('.popup__input_type_name');
var jobInput = document.querySelector('.popup__input_type_job');
var addFormElementSelector = '.popup__form_type_add';
var addSubmitBtn = document.querySelector('button[name="add-submit"]');
var titleInput = document.querySelector('.popup__input_type_title');
var linkInput = document.querySelector('.popup__input_type_image');
var avatarFormElementSelector = '.popup__form_type_avatar';
var avatarImg = document.querySelector('.profile__avatar');
var cardListSelector = '.elements';
var templateSelector = '#temp';

/***/ }),

/***/ "./src/pages/index.css":
/*!*****************************!*\
  !*** ./src/pages/index.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!****************************!*\
  !*** ./src/pages/index.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ "./src/pages/index.css");
/* harmony import */ var _components_Card_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Card.js */ "./src/components/Card.js");
/* harmony import */ var _components_selectorsConfig_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/selectorsConfig.js */ "./src/components/selectorsConfig.js");
/* harmony import */ var _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/FormValidator.js */ "./src/components/FormValidator.js");
/* harmony import */ var _utils_utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/utils.js */ "./src/utils/utils.js");
/* harmony import */ var _components_Section_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/Section.js */ "./src/components/Section.js");
/* harmony import */ var _components_UserInfo_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/UserInfo.js */ "./src/components/UserInfo.js");
/* harmony import */ var _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/PopupWithForm.js */ "./src/components/PopupWithForm.js");
/* harmony import */ var _components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/PopupWithImage.js */ "./src/components/PopupWithImage.js");
/* harmony import */ var _components_PopupWithConfirmation_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/PopupWithConfirmation.js */ "./src/components/PopupWithConfirmation.js");
/* harmony import */ var _components_Api__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../components/Api */ "./src/components/Api.js");











var api = new _components_Api__WEBPACK_IMPORTED_MODULE_10__["default"]({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort36',
  headers: {
    authorization: _utils_utils_js__WEBPACK_IMPORTED_MODULE_4__.token,
    'Content-Type': 'application/json; charset=UTF-8'
  },
  renderCardsCallback: function renderCardsCallback(items) {
    cardsContainer.renderItems(items);
  },
  setUserInfoCallback: function setUserInfoCallback(res) {
    userInformation.setUserInfo({
      name: res.name,
      job: res.about
    });
  },
  addNewCardCallback: function addNewCardCallback(res) {
    var newCard = createNewCard(res);
    cardsContainer.addItem(newCard, 'start');
  }
});
var userInformation = new _components_UserInfo_js__WEBPACK_IMPORTED_MODULE_6__["default"]({
  nameSelector: _utils_utils_js__WEBPACK_IMPORTED_MODULE_4__.profNameSelector,
  jobSelector: _utils_utils_js__WEBPACK_IMPORTED_MODULE_4__.profJobSelector
});
var openedImg = new _components_PopupWithImage_js__WEBPACK_IMPORTED_MODULE_8__["default"]({
  popup: _utils_utils_js__WEBPACK_IMPORTED_MODULE_4__.imgPopupElement
});

function createNewCard(item) {
  var card = new _components_Card_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
    data: item,
    handleImgClick: function handleImgClick() {
      openedImg.open(item);
    },
    handleDelClick: function handleDelClick() {
      delCardPopup.setSubmitAction(function (evt) {
        evt.preventDefault();
        api.delCard(item._id);
        card.delCard();
        delCardPopup.close();
      });
      delCardPopup.open();
    },
    handleLike: function handleLike() {
      api.likeCard({
        cardId: item._id,
        changeLikeBtnView: function changeLikeBtnView(res) {
          card.changeBtnView(res);
        }
      });
    },
    handleDislike: function handleDislike() {
      api.dislikeCard({
        cardId: item._id,
        changeLikeBtnView: function changeLikeBtnView(res) {
          card.changeBtnView(res);
        }
      });
    },
    templateSelector: _utils_utils_js__WEBPACK_IMPORTED_MODULE_4__.templateSelector
  });
  var cardElement = card.createCard();
  return cardElement;
}

function fillProfilePopupInputs() {
  var userInfo = userInformation.getUserInfo();
  _utils_utils_js__WEBPACK_IMPORTED_MODULE_4__.nameInput.value = userInfo.userName;
  _utils_utils_js__WEBPACK_IMPORTED_MODULE_4__.jobInput.value = userInfo.userJob;
}

var cardsContainer = new _components_Section_js__WEBPACK_IMPORTED_MODULE_5__["default"]({
  renderer: function renderer(item) {
    var initialCard = createNewCard(item);
    cardsContainer.addItem(initialCard, 'end');
  }
}, _utils_utils_js__WEBPACK_IMPORTED_MODULE_4__.cardListSelector);
var profilePopup = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_7__["default"]({
  popup: _utils_utils_js__WEBPACK_IMPORTED_MODULE_4__.profilePopupElement,
  submitFormCallback: function submitFormCallback(evt) {
    evt.preventDefault();
    api.setUserinfo({
      name: _utils_utils_js__WEBPACK_IMPORTED_MODULE_4__.nameInput.value,
      about: _utils_utils_js__WEBPACK_IMPORTED_MODULE_4__.jobInput.value
    });
    profilePopup.close();
  }
});
var addCardPopup = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_7__["default"]({
  popup: _utils_utils_js__WEBPACK_IMPORTED_MODULE_4__.addCardPopupElement,
  submitFormCallback: function submitFormCallback(evt) {
    evt.preventDefault();
    var newCardData = addCardPopup.getInputValues();
    api.addCard({
      name: newCardData.name,
      link: newCardData.link
    });
    addFormValidator.disableButton(_utils_utils_js__WEBPACK_IMPORTED_MODULE_4__.addSubmitBtn, _components_selectorsConfig_js__WEBPACK_IMPORTED_MODULE_2__.selectorsConfig.inactiveButtonClass);
    addCardPopup.close();
  }
});
var delCardPopup = new _components_PopupWithConfirmation_js__WEBPACK_IMPORTED_MODULE_9__["default"]({
  popup: _utils_utils_js__WEBPACK_IMPORTED_MODULE_4__.delCardPopupElement
});
var avatarPopup = new _components_PopupWithForm_js__WEBPACK_IMPORTED_MODULE_7__["default"]({
  popup: _utils_utils_js__WEBPACK_IMPORTED_MODULE_4__.avatarPopupElement,
  submitFormCallback: function submitFormCallback(evt) {
    evt.preventDefault();
    var avatarPopupInputValue = avatarPopup.getInputValues();
    console.log(avatarPopupInputValue);
    api.changeAvatar(avatarPopupInputValue, _utils_utils_js__WEBPACK_IMPORTED_MODULE_4__.avatarImg);
    avatarPopup.close();
  }
});
var editFormValidator = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_3__["default"](_components_selectorsConfig_js__WEBPACK_IMPORTED_MODULE_2__.selectorsConfig, _utils_utils_js__WEBPACK_IMPORTED_MODULE_4__.editFormElementSelector);
editFormValidator.enableValidation();
var addFormValidator = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_3__["default"](_components_selectorsConfig_js__WEBPACK_IMPORTED_MODULE_2__.selectorsConfig, _utils_utils_js__WEBPACK_IMPORTED_MODULE_4__.addFormElementSelector);
addFormValidator.enableValidation();
var avatarFormValidator = new _components_FormValidator_js__WEBPACK_IMPORTED_MODULE_3__["default"](_components_selectorsConfig_js__WEBPACK_IMPORTED_MODULE_2__.selectorsConfig, _utils_utils_js__WEBPACK_IMPORTED_MODULE_4__.avatarFormElementSelector);
avatarFormValidator.enableValidation();
profilePopup.setEventListeners();
addCardPopup.setEventListeners();
delCardPopup.setEventListeners();
avatarPopup.setEventListeners();
api.getInitialCards();
api.getUserInfo(_utils_utils_js__WEBPACK_IMPORTED_MODULE_4__.avatarImg);
_utils_utils_js__WEBPACK_IMPORTED_MODULE_4__.editBtn.addEventListener('click', function () {
  editFormValidator.activateButton(_utils_utils_js__WEBPACK_IMPORTED_MODULE_4__.editSubmitBtn, _components_selectorsConfig_js__WEBPACK_IMPORTED_MODULE_2__.selectorsConfig.inactiveButtonClass);
  editFormValidator.hideErrorMessage();
  profilePopup.open();
  fillProfilePopupInputs();
});
_utils_utils_js__WEBPACK_IMPORTED_MODULE_4__.addBtn.addEventListener('click', function () {
  addFormValidator.hideErrorMessage();
  addCardPopup.open();
});
_utils_utils_js__WEBPACK_IMPORTED_MODULE_4__.avatarBtn.addEventListener('click', function () {
  avatarFormValidator.hideErrorMessage();
  avatarFormValidator.disableButton();
  avatarPopup.open();
});
})();

/******/ })()
;
//# sourceMappingURL=main.js.map