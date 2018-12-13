//==============================================================================
// MKR_PlayerMoveForbid.js
//==============================================================================
// Copyright (c) 2016-2017 �}���J�C���h
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// -----------------------------------------------------------------------------
// Version
// 1.0.5 2017/12/10 �ړ��֎~�̊ԁA����L�[�𓮍삳���邩�̃t���O��ǉ�
//
// 1.0.4 2017/08/27 �v���O�C���p�����[�^�̎w����@��ύX
//
// 1.0.3 2017/05/24 ���j���[�J�t���O������ɓ��삵�Ă��Ȃ��������ߏC��
//
// 1.0.2 2017/02/19 �ړ��֎~�̊ԁA���j���[�J���s���邩�̃t���O��ǉ�
//
// 1.0.1 2016/09/04 ���g�p�̃R�[�h���폜���t�@�C���e�ʂ������������B
//                  �f�t�H���g�l�̐ݒ肪�s�K�؂������̂ŏC���B
//
// 1.0.0 2016/09/04 ���Ō��J�B
// -----------------------------------------------------------------------------
// [Twitter] https://twitter.com/mankind_games/
//  [GitHub] https://github.com/mankindGames/
//    [Blog] http://mankind-games.blogspot.jp/
//==============================================================================

/*:
 *
 * @plugindesc (v1.0.5) �v���C���[�ړ��֎~�v���O�C��
 * @author �}���J�C���h
 *
 * @help �w�肳�ꂽ�ԍ��̃X�C�b�`��ON�̊ԁA
 * �v���C���[����ɂ��L�����̈ړ����֎~���܂��B
 *
 * �v���O�C���p�����[�^�[[�ړ��֎~�X�C�b�`]�ɃX�C�b�`�ԍ����w�肵�܂��B
 * �w�肳�ꂽ�ԍ��̃X�C�b�`��ON�ɂȂ��Ă���ԁA
 * �v���C���[����ɂ��L�����̈ړ����ł��Ȃ��Ȃ�܂��B
 * ([�ړ����[�g�̐ݒ�]�R�}���h�Ȃǂňړ������邱�Ƃ͉\�ł�)
 *
 * [���j���[�J����]�ɂ��A[�ړ��֎~�X�C�b�`]��ON�ɂȂ��Ă���Ԃ�
 * ���j���[�J�𐧌�ł��܂��B
 *
 * [����L�[����]�ɂ��A[�ړ��֎~�X�C�b�`]��ON�ɂȂ��Ă���Ԃ�
 * ����L�[/�^�b�`����ɂ�铮��(��ɃC�x���g�̋N��)�𐧌�ł��܂��B
 *
 *
 * �v���O�C���R�}���h:
 *   ����܂���B
 *
 *
 * �X�N���v�g�R�}���h:
 *   ����܂���B
 *
 *
 * ���p�K��:
 *   �E��҂ɖ��f�Ŗ{�v���O�C���̉��ρA�Ĕz�z���\�ł��B
 *     (�������w�b�_�[�̒��쌠�\�������͎c���Ă��������B)
 *
 *   �E���p�`��(�t���[�Q�[���A���p�Q�[���AR-18��i��)�ɐ����͂���܂���B
 *     �����R�ɂ��g�����������B
 *
 *   �E�{�v���O�C�����g�p�������Ƃɂ�蔭���������ɂ��č�҂͈�؂̐ӔC��
 *     �����܂���B
 *
 *   �E�v�]�Ȃǂ�����ꍇ�A�{�v���O�C���̃o�[�W�����A�b�v���s��
 *     �\��������܂����A
 *     �o�[�W�����A�b�v�ɂ��{�v���O�C���̎d�l���ύX�����\��������܂��B
 *     ���������������B
 *
 *
 * @param Default_Move_Flag
 * @text �ړ��֎~�X�C�b�`
 * @desc ON�̊ԁA�v���C���[�̈ړ����֎~����X�C�b�`�ԍ����w�肵�܂��B(�f�t�H���g:10)
 * @type switch
 * @default 10
 *
 * @param Default_Menu_Flag
 * @text ���j���[�J����
 * @desc �v���C���[�̈ړ����֎~���Ă���ԁA���j���[�̊J�������邩�ǂ�����ݒ肵�܂��B(�f�t�H���g:������)
 * @type boolean
 * @on ������
 * @off �����Ȃ�
 * @default true
 *
 * @param Enter Flag
 * @text ����L�[����
 * @desc �v���C���[�̈ړ����֎~���Ă���ԁA����L�[/�^�b�`����ɂ�铮��������邩�ǂ�����ݒ肵�܂��B(�f�t�H���g:������)
 * @type boolean
 * @on ������
 * @off �����Ȃ�
 * @default true
 *
*/
(function () {
    'use strict';

    const PN = "MKR_PlayerMoveForbid";

    const CheckParam = function(type, param, def, min, max) {
        let Parameters, regExp, value;
        Parameters = PluginManager.parameters(PN);

        if(arguments.length < 4) {
            min = -Infinity;
            max = Infinity;
        }
        if(arguments.length < 5) {
            max = Infinity;
        }
        if(param in Parameters) {
            value = String(Parameters[param]);
        } else {
            throw new Error("[CheckParam] �v���O�C���p�����[�^�[������܂���: " + param);
        }

        switch(type) {
            case "bool":
                if(value == "") {
                    value = (def)? true : false;
                }
                value = value.toUpperCase() === "ON" || value.toUpperCase() === "TRUE" || value.toUpperCase() === "1";
                break;
            case "switch":
                if(value == "") {
                    value = (def != "")? def : value;
                }
                if(!value.match(/^(\d+)$/i)) {
                    throw new Error("[CheckParam] " + param + "�̒l���X�C�b�`�ł͂���܂���: " + param + " : " + value);
                }
                break;
            default:
                throw new Error("[CheckParam] " + param + "�̃^�C�v���s���ł�: " + type);
                break;
        }

        return [value, type, def, min, max, param];
    }

    const Params = {
        "MoveSwitch" : CheckParam("switch", "Default_Move_Flag", "10"),
        "MenuFlg" : CheckParam("bool", "Default_Menu_Flag", true),
        "EnterFlg" : CheckParam("bool", "Enter Flag", true),
    };


    //=========================================================================
    // Game_System
    //  �E���j���[�J���������Ē�`���܂��B
    //
    //=========================================================================
    const _Game_System_isMenuEnabled = Game_System.prototype.isMenuEnabled;
    Game_System.prototype.isMenuEnabled = function() {
        return _Game_System_isMenuEnabled.call(this)
            && ($gameSwitches.value(Params.MoveSwitch[0]) ? Params.MenuFlg[0] == true : true);
    };


    //=========================================================================
    // Game_Player
    //  �E�v���C���[�̈ړ��������Ē�`���܂��B
    //
    //=========================================================================
    const _Game_Player_executeMove = Game_Player.prototype.executeMove;
    Game_Player.prototype.executeMove = function(direction) {
        if(!$gameSwitches.value(Params.MoveSwitch[0])) {
            _Game_Player_executeMove.call(this, direction);
        }
    };

    const _Game_Player_triggerButtonAction = Game_Player.prototype.triggerButtonAction;
    Game_Player.prototype.triggerButtonAction = function() {
        if($gameSwitches.value(Params.MoveSwitch[0]) && !Params.EnterFlg[0]) {
        } else {
            _Game_Player_triggerButtonAction.call(this);
        }
        return false;
    };

    const _Game_Player_triggerTouchAction = Game_Player.prototype.triggerTouchAction;
    Game_Player.prototype.triggerTouchAction = function() {
        if($gameSwitches.value(Params.MoveSwitch[0]) && !Params.EnterFlg[0]) {
        } else {
            _Game_Player_triggerTouchAction.call(this);
        }
        return false;
    };

})();