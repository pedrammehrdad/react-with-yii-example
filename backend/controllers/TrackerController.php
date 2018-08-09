<?php

namespace app\controllers;

use yii\rest\ActiveController;

class TrackerController extends ActiveController
{

    public $modelClass = '\app\models\Tracker';
    public $enableCsrfValidation = false;

    public static function allowedDomains()
    {
        return [
            '*', // star allows all domains
//            'http://localhost:3000',
        ];
    }

    public function behaviors()
    {
        return array_merge(parent::behaviors(), [
            // For cross-domain AJAX request
            'corsFilter' => [
                'class' => \yii\filters\Cors::className(),
                'cors' => [
                    // restrict access to domains:
                    'Origin' => static::allowedDomains(),
                    'Access-Control-Request-Method' => ['*'],
                    'Access-Control-Allow-Credentials' => true,
                    'Access-Control-Max-Age' => 3600, // Cache (seconds)
                    'Access-Control-Expose-Headers' => ['X-Pagination-Current-Page', 'X-Pagination-Page-Count', 'X-Pagination-Per-Page', 'X-Pagination-Total-Count'],
                ],
            ],
        ]);
    }

    public function actions()
    {
        $actions = \yii\helpers\ArrayHelper::merge(
                        parent::actions(), [
                    'index' => [
                        'prepareDataProvider' => function ($action) {
                            /* @var $modelClass \yii\db\BaseActiveRecord */
                            $modelClass = $action->modelClass;

                            return \Yii::createObject([
                                        'class' => \yii\data\ActiveDataProvider::className(),
                                        'query' => $modelClass::find(),
                                        //'pagination' => false,
                                        'pagination' => [
                                            'pageSize' => \Yii::$app->request->get('pageSize', 10),
                                        ],
                            ]);
                        },
                    ],
                        ]
        );

        return $actions;
    }

    public function actionSearch(){
        $searchModel  = new \app\models\TrackerSearch();

        $dataProvider = $searchModel->search(\Yii::$app->request->queryParams);
        return $dataProvider;
    }
}
