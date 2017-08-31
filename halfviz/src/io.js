(function(){
  //
  // the popup menu/button at the top of the editor textarea
  //
  IO = function(elt){
    var dom = $(elt)
    var _dialog = dom.find('.dialog')
    var _animating = false
    
    var that = {
      init:function(){

        return that
      },
            
      navigate:function(e){
        trace(e.path)
        var docId = e.path.replace(/^\//,'')
        
        if (!docId.match(/^[ \t]*$/)){
          $(that).trigger({type:"get", id:docId})
        }
      },
      
      exampleClick:function(e){
        var elt = $(e.target)
        var targetDoc = elt.closest('li').attr('class')
        
        elt.closest('ul').find('a').removeClass('active')
        elt.addClass('active')
        
        
        $.address.value(targetDoc)
        that.hideExamples()
        return false
      },

      showExamples:function(){
        if (_animating) return
        _animating = true
        dom.find('.examples').addClass('selected')
        
        _dialog.find('a').removeClass('active')
        var viewingId = location.hash.replace(/#\//,'')
        if (viewingId.length) _dialog.find('li.'+viewingId).find('a').addClass('active')
        
        
        _dialog.stop(true).slideDown(function(){
          _animating = false
        })
      },
      hideExamples:function(){
        if (_animating) return
        _animating = true
        dom.find('.examples').removeClass('selected')
        _dialog.stop(true).slideUp(function(){
          _animating = false
        })
      },
      
      menuClick:function(e){
        var button = (e.target.tagName=='A') ? $(e.target) : $(e.target).closest('a')
        var type = button.attr('class').replace(/\s?(selected|active)\s?/,'')
        
        switch(type){
        case "examples":
          var toggled = button.hasClass('selected')
          if (toggled) that.hideExamples()
          else that.showExamples()
          break
          
        case "new":
          that.hideExamples()
          $(that).trigger({type:"clear"})
          break

        case "save":
          if ($(e.target).attr('href')!='#'){
            return true
          }
          $(that).trigger({type:"save"})
          break
        }
        
        return false
      }
    }
    
    return that.init()    
  }
  
})()