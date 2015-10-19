class OrganizerController < ApplicationController

  def global
    @sub = SubjectArea.find(1)
    @lol = []
    @sub.subject.each do |item|
      @lol.push({name: item.data['name'], height: item.data['height'].to_i, width: item.data['width'].to_i,
        top: item.data['top'].to_i, left: item.data['left'].to_i, watch: item.data['watch'],
        haveBeenWatching: item.data['haveBeenWatching'].to_i, id: item.id})
    end
    @podsub = [{id: @sub.id, name: @sub.data['name'], color: @sub.data['color'],
                minHeight: @sub.data['minHeight'].to_i, minWidth: @sub.data['minWidth'].to_i,
                height: @sub.data['height'].to_i, top: @sub.data['top'].to_i,
                width: @sub.data['width'].to_i, left: @sub.data['left'].to_i,
                subjects: @lol}]
  end

  def got_subject
    if params[:id].to_i != 0
      Subject.find(params[:id]).update(data: params)
    else
      SubjectArea.find(params[:parent_id]).subject.new(data: params).save
    end
    render nothing: true
  end

  def got_subject_area
    if params[:id]
      SubjectArea.find(params[:id]).update(data: params)
    else
      SubjectArea.new(data: params).save
    end
    render nothing: true
  end

  def each_day
  end

  def calendar
  end
end
