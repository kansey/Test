class CreateGlobalSubjectAreas < ActiveRecord::Migration
  def change
    create_table :global_subject_areas do |t|

      t.timestamps null: false
    end
  end
end
