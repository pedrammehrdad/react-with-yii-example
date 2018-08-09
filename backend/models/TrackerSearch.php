<?php

namespace app\models;

use Yii;
use yii\base\Model;
use yii\data\ActiveDataProvider;
use app\models\Tracker;

/**
 * TrackerSearch represents the model behind the search form of `\app\models\Tracker`.
 */
class TrackerSearch extends Tracker
{

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
                [['_id', 'start_time', 'end_time', 'description', 'duration'], 'safe'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function scenarios()
    {
        // bypass scenarios() implementation in the parent class
        return Model::scenarios();
    }

    /**
     * Creates data provider instance with search query applied
     *
     * @param array $params
     *
     * @return ActiveDataProvider
     */
    public function search($params)
    {
        $query = Tracker::find();
        // add conditions that should always apply here

        $dataProvider = new ActiveDataProvider([
            'query' => $query,
            'pagination' => [
                'pageSize' => \Yii::$app->request->get('pageSize', 10),
            ],
        ]);

        $this->load($params);

        if (!$this->validate()) {
            // uncomment the following line if you do not want to return any records when validation fails
            // $query->where('0=1');
            return $dataProvider;
        }

        // grid filtering conditions
        $query->andFilterWhere(['like', '_id', $this->_id])
                ->andFilterWhere(['like', 'start_time', $this->start_time])
                ->andFilterWhere(['like', 'end_time', $this->end_time])
                ->andFilterWhere(['like', 'description', $this->description])
                ->andFilterWhere(['like', 'duration', $this->duration]);

        return $dataProvider;
    }

}
