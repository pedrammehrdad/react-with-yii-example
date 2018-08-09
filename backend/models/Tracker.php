<?php

namespace app\models;

use Yii;

/**
 * This is the model class for collection "tracker".
 *
 * @property \MongoDB\BSON\ObjectID|string $_id
 * @property mixed $start_time
 * @property mixed $end_time
 * @property mixed $description
 * @property mixed $duration
 */
class Tracker extends \yii\mongodb\ActiveRecord
{

    /**
     * {@inheritdoc}
     */
    public static function collectionName()
    {
        return ['tracker', 'tracker'];
    }

    /**
     * {@inheritdoc}
     */
    public function attributes()
    {
        return [
            '_id',
            'start_time',
            'end_time',
            'description',
            'duration',
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
                [['start_time', 'end_time', 'description', 'duration'], 'required'],
                ['end_time', 'default', 'value' => time()],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            '_id' => 'ID',
            'start_time' => 'Start Time',
            'end_time' => 'End Time',
            'description' => 'Description',
            'duration' => 'Duration',
        ];
    }

}
