class CreateSubjects < ActiveRecord::Migration
  def change
    create_table :subjects do |t|
      t.integer :subject_area_id
      t.json    :data, default: {}

      t.timestamps null: false
    end
  end
end
