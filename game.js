const green = document.getElementById('green');
const lemon = document.getElementById('lemon');
const orange = document.getElementById('orange');
const melon = document.getElementById('melon');
const btnEmpezar = document.getElementById('btnEmpezar');
const sweet_alert = document.getElementsByClassName('swal-overlay')[0];
const TIME_DELAY = 1500;//1.5 seconds
const LAST_LEVEL = 3;


class Juego{
    constructor(){
        this.inicializar();
        this.nextLevel();   
    }
    inicializar(){  
        this.idx_random = [];
        this.nextLevel = this.nextLevel.bind(this)
        this.elegirColor = this.elegirColor.bind(this)
        this.toggleBtnEmpezar();
        this.nivel=1;
        this.colors_memorized=0;
    }
    toggleBtnEmpezar(){
        if(btnEmpezar.classList.contains('hide')){
            btnEmpezar.classList.remove('hide')
        }else{
            btnEmpezar.classList.add('hide')
        }

    }
    nextLevel(){
        this.sub_level = 0;
        this.create_patron();
    }
    create_patron(){
        console.log(this)
        this.idx_random = new Array(this.nivel).fill(0).map(n =>Math.floor(Math.random() * 4));
        for(let i=0;i<this.nivel;i++){
            setTimeout(() => this.illuminate_section(i,this.idx_random),TIME_DELAY*i)
            
        }
        
    }
    illuminate_section(i,idx_random){
        this.remove_click_event_Listener();
        this.ligth_color(i,idx_random)
        setTimeout(()=>this.turn_off_color(i,idx_random),560);

    }
    ligth_color(i,idx_random){
        if(idx_random[i] == 0){
            green.classList.add('ligth')
        }else if(idx_random[i] ==1){
            lemon.classList.add('ligth')
        }else if(idx_random[i] ==2){
            orange.classList.add('ligth')
        }else{
            melon.classList.add('ligth')
        }

    }
    turn_off_color(i,idx_random){
        if(idx_random[i] == 0){
            green.classList.remove('ligth')
        }else if(idx_random[i] ==1){
            lemon.classList.remove('ligth')
        }else if(idx_random[i] ==2){
            orange.classList.remove('ligth')
        }else{
            melon.classList.remove('ligth')
        }
        this.add_click_event_Listener();
    }
    add_click_event_Listener(){
      green.addEventListener('click',this.elegirColor);
      lemon.addEventListener('click',this.elegirColor);
      orange.addEventListener('click',this.elegirColor);
      melon.addEventListener('click',this.elegirColor);

    }
    remove_click_event_Listener(){
        green.removeEventListener('click',this.elegirColor);
        lemon.removeEventListener('click',this.elegirColor);
        orange.removeEventListener('click',this.elegirColor);
        melon.removeEventListener('click',this.elegirColor);
  
    }
    elegirColor(ev){
        const election = ev.target.dataset.position;
        console.log(election)
        console.log(this.idx_random)
        
        if(election == this.idx_random[this.sub_level]){
            this.sub_level++;
            if(this.sub_level == this.nivel){
                this.check_sublevel();
                if(this.nivel == (LAST_LEVEL+1)){
                    this.nivel--;
                    this.win_game();
                }else{
                    this.pass_level();
                }
            }
        }else{
            this.lose_game()

        }
    }
    check_sublevel(){
        this.colors_memorized += this.nivel;
        this.nivel++;
    }
    pass_level(){
            swal('Game Colors', 'Perfect!, next level', 'success')
            .then(() => setTimeout(this.nextLevel, 800))
    }
    win_game(){
        swal({
            title: 'You win',
            text: `Level reached: ${this.nivel}
                    Total colors memorized: ${this.colors_memorized}
                    you rock!!!`,
            icon: 'success',
            className:''})
        //.then(() => setTimeout(this.empezarJuego, 800))
    }
    lose_game(){
       
        swal({
            title:'Game Colors',
            text: 'Better Look next time! Try Again',
            icon: 'error',
            className: 'swal-overlay-red',
            button:{
                text: "OK",
                value: true,
                visible: true,
                className: "swal-lose__btn-ok",
                closeModal: true,
            }
        })
        .then(this.toggleBtnEmpezar)
    }
}


function empezarJuego(){
    window.juego = new Juego();
}